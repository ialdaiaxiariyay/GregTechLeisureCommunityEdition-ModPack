import os
import json
import re
import logging
from datetime import datetime

def setup_logger():
    """配置日志记录器"""
    logger = logging.getLogger('text_replacer')
    logger.setLevel(logging.INFO)
    
    # 创建文件处理器
    file_handler = logging.FileHandler('log.log', encoding='utf-8')
    file_handler.setLevel(logging.INFO)
    
    # 创建控制台处理器
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    
    # 创建格式化器
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)
    
    # 添加处理器到日志记录器
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)
    
    return logger

def main():
    # 设置日志记录器
    logger = setup_logger()
    logger.info("=== 文本替换程序开始运行 ===")
    
    # 获取脚本所在目录作为工作目录
    work_dir = os.path.dirname(os.path.abspath(__file__))
    logger.info(f"工作目录: {work_dir}")
    
    # 定义关键文件路径
    zh_cn_path = os.path.join(work_dir, 'zh_cn.json')
    
    # 检查zh_cn.json是否存在
    if not os.path.exists(zh_cn_path):
        logger.error(f"错误：找不到zh_cn.json文件 - {zh_cn_path}")
        return
    
    try:
        # 读取翻译文件
        with open(zh_cn_path, 'r', encoding='utf-8') as f:
            translations = json.load(f)
        logger.info(f"成功读取zh_cn.json，包含 {len(translations)} 个翻译条目")
    except Exception as e:
        logger.error(f"解析JSON文件出错: {e}")
        return
    
    # 提取所有键中的标识符
    identifiers = set()
    for key in translations.keys():
        if '.' in key:
            last_part = key.split('.')[-1]
            identifiers.add(last_part)
            logger.debug(f"添加标识符: {last_part}")
    
    logger.info(f"提取到 {len(identifiers)} 个唯一标识符")
    
    # 处理所有JS文件
    processed_files = 0
    total_replacements = 0
    
    for filename in os.listdir(work_dir):
        if filename.lower().endswith('.js'):
            file_path = os.path.join(work_dir, filename)
            logger.info(f"处理文件: {filename}")
            
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception as e:
                logger.error(f"读取文件 {filename} 出错: {e}")
                continue
            
            # 查找并替换所有匹配项
            new_content = content
            replacements = []
            
            for id in identifiers:
                # 构建正则表达式：匹配 "gtceu:id" 但不匹配 "gtlcecore:id"
                pattern = r'(gtceu:)' + re.escape(id) + r'(?=[^\w]|$)'
                replacement = r'gtlcecore:' + id
                
                # 查找所有匹配项
                matches = list(re.finditer(pattern, new_content))
                if matches:
                    for match in matches:
                        original = match.group(0)
                        replaced = re.sub(pattern, replacement, original, count=1)
                        replacements.append({
                            'identifier': id,
                            'original': original,
                            'replaced': replaced,
                            'position': match.start()
                        })
                        logger.debug(f"匹配到: {original} -> {replaced} (位置: {match.start()})")
                    
                    # 执行替换
                    new_content = re.sub(pattern, replacement, new_content)
                    logger.info(f"在文件 {filename} 中替换了 {len(matches)} 处 '{id}'")
                    total_replacements += len(matches)
            
            # 如果有修改则写回文件
            if new_content != content:
                try:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    
                    # 记录替换详情
                    logger.info(f"文件 {filename} 已更新，共 {len(replacements)} 处替换")
                    processed_files += 1
                    
                    # 记录详细替换信息
                    for r in replacements:
                        logger.info(f"  替换: {r['original']} -> {r['replaced']} (位置: {r['position']})")
                except Exception as e:
                    logger.error(f"写入文件 {filename} 出错: {e}")
    
    # 最终统计
    logger.info(f"=== 处理完成 ===")
    logger.info(f"扫描文件总数: {len([f for f in os.listdir(work_dir) if f.lower().endswith('.js')])}")
    logger.info(f"修改文件数量: {processed_files}")
    logger.info(f"总替换次数: {total_replacements}")

if __name__ == '__main__':
    main()