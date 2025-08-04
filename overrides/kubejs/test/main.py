import re
import os

def parse_js_recipe(block):
    # 解析配方类型和名称
    recipe_type_match = re.search(r'gtr\.(\w+)\("([^"]+)"\)', block)
    if not recipe_type_match:
        return None
    recipe_type = recipe_type_match.group(1)
    recipe_name = recipe_type_match.group(2)
    
    # 确定Java代码的起始行
    if recipe_type == "assembler_module":
        java_lines = [f'gtr.{recipe_type}.recipeBuilder("{recipe_name}")']
    else:
        java_lines = [f'gtr.{recipe_type}.recipeBuilder("{recipe_name}")']
    
    # 解析itemInputs
    item_inputs_match = re.search(r'\.itemInputs\(([^)]+)\)', block, re.DOTALL)
    if item_inputs_match:
        inputs_str = item_inputs_match.group(1).strip()
        # 移除可能的引号和逗号
        inputs_str = inputs_str.replace('"', '').replace("'", "")
        # 正确分割所有物品
        items = [item.strip() for item in inputs_str.split(',') if item.strip()]
        
        for item in items:
            if not item:
                continue
            if 'x ' in item:
                # 处理带数量的物品
                count, item_id = re.split(r'\s*x\s*', item, 1)
                java_lines.append(f'    .inputItems(RegistriesUtil.getItem("{item_id.strip()}"), {count.strip()})')
            else:
                # 处理不带数量的物品
                java_lines.append(f'    .inputItems(RegistriesUtil.getItem("{item.strip()}"))')
    
    # 解析notConsumable
    not_consumable_matches = re.findall(r'\.notConsumable\("([^"]+)"\)', block)
    for item_id in not_consumable_matches:
        java_lines.append(f'    .notConsumable(RegistriesUtil.getItem("{item_id}"))')
    
    # 解析itemOutputs
    item_outputs_match = re.search(r'\.itemOutputs\(([^)]+)\)', block, re.DOTALL)
    if item_outputs_match:
        outputs_str = item_outputs_match.group(1).strip()
        outputs_str = outputs_str.replace('"', '').replace("'", "")
        outputs = [output.strip() for output in outputs_str.split(',') if output.strip()]
        
        for output in outputs:
            if not output:
                continue
            if 'x ' in output:
                count, item_id = re.split(r'\s*x\s*', output, 1)
                java_lines.append(f'    .outputItems(RegistriesUtil.getItem("{item_id.strip()}"), {count.strip()})')
            else:
                java_lines.append(f'    .outputItems(RegistriesUtil.getItem("{output.strip()}"))')
    
    # 解析inputFluids
    input_fluids_match = re.search(r'\.inputFluids\(([^)]+)\)', block, re.DOTALL)
    if input_fluids_match:
        fluids_str = input_fluids_match.group(1).strip()
        fluids_str = fluids_str.replace('"', '').replace("'", "")
        fluids = [fluid.strip() for fluid in fluids_str.split(',') if fluid.strip()]
        
        for fluid in fluids:
            if not fluid:
                continue
            parts = fluid.rsplit(' ', 1)
            if len(parts) == 2 and parts[1].isdigit():
                java_lines.append(f'    .inputFluids(RegistriesUtil.getFluid("{parts[0].strip()}",{parts[1].strip()}))')
            else:
                # 处理没有数量的流体
                java_lines.append(f'    .inputFluids(RegistriesUtil.getFluid("{fluid.strip()}"))')
    
    # 解析EUt值
    eut_match = re.search(r'\.EUt\(([^)]+)\)', block)
    if eut_match:
        eut_value = eut_match.group(1)
        # 处理乘法表达式中的L后缀
        if '*' in eut_value:
            # 确保格式为 16L* 而不是 16 L*
            eut_value = re.sub(r'(\d+)\s*\*', r'\1L*', eut_value)
        java_lines.append(f'    .EUt({eut_value})')
    
    # 解析duration
    duration_match = re.search(r'\.duration\((\d+)\)', block)
    if duration_match:
        java_lines.append(f'    .duration({duration_match.group(1)})')
    
    # 解析addData
    add_data_match = re.search(r'\.addData\("([^"]+)",\s*(\d+)\)', block)
    if add_data_match:
        java_lines.append(f'    .addData("{add_data_match.group(1)}", {add_data_match.group(2)})')
    
    # 解析stationResearch（特殊处理多行lambda）
    research_match = re.search(r'\.stationResearch\((.*?)\)\)', block, re.DOTALL)
    if research_match:
        research_body = research_match.group(1).strip()
        # 替换Registry为RegistriesUtil
        research_body = research_body.replace('Registries.getItemStack', 'RegistriesUtil.getItemStack')
        
        if '=>' in research_body:  # 处理箭头函数
            research_body = research_body.replace('=>', '->')
        
        # 处理多行表达式
        if '\n' in research_body:
            lines = research_body.split('\n')
            formatted_research = lines[0].strip()
            # 添加适当的缩进
            for i in range(1, len(lines)):
                # 每行添加24个空格的缩进
                formatted_research += '\n' + ' ' * 24 + lines[i].strip()
            # 确保正确闭合
            java_lines.append(f'    .stationResearch({formatted_research})))')
        else:
            # 单行表达式也需要正确闭合
            java_lines.append(f'    .stationResearch({research_body})))')
    
    # 添加保存语句
    java_lines.append('    .save(provider);')
    
    return '\n'.join(java_lines)

def convert_js_to_java(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 按配方块分割（以gtr.开头的行作为新配方的开始）
    recipe_blocks = re.split(r'(?=gtr\.\w+\s*\()', content)
    # 移除第一个空元素（如果有）
    recipe_blocks = [block.strip() for block in recipe_blocks if block.strip()]
    
    # 处理每个配方块
    java_recipes = []
    for block in recipe_blocks:
        # 确保块以gtr.开头
        if not block.startswith('gtr.'):
            continue
            
        java_recipe = parse_js_recipe(block)
        if java_recipe:
            java_recipes.append(java_recipe)
    
    # 写入输出文件
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(java_recipes))

if __name__ == "__main__":
    input_js = 'pf.js'
    output_java = 'pf_java.txt'
    
    if not os.path.exists(input_js):
        print(f"错误: 输入文件 {input_js} 不存在")
    else:
        convert_js_to_java(input_js, output_java)
        print(f"转换完成! Java配方已保存到 {output_java}")