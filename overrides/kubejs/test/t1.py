def generate_suprachronal_recipes():
    tierss = [
        ["ulv", 0],
        ["lv", 1],
        ["mv", 2],
        ["hv", 3],
        ["ev", 4],
        ["iv", 5],
        ["luv", 6],
        ["zpm", 7],
        ["uv", 8],
        ["uhv", 9],
        ["uev", 10],
        ["uiv", 11],
        ["uxv", 12],
        ["opv", 13],
        ["max", 14]
    ]
    
    java_recipes = []
    
    for c in tierss:
        tier_name = c[0]
        tier_index = c[1]
        recipe_id = f"gtlcecore:suprachronal_{tier_name}"
        
        # 计算配方参数
        fluid_amount1 = tier_index + 1
        fluid_amount2 = (tier_index + 1) * 10
        fluid_amount3 = (tier_index + 1) * 100
        fluid_amount4 = (tier_index + 1) * 100
        duration = 2 * (tier_index + 1)
        circuit = tier_index + 1
        
        # 确定研究栈
        if tier_index + 1 == 1:
            research_stack = "gtlcecore:supracausal_mainframe"
        else:
            prev_tier = tierss[tier_index - 1][0]
            research_stack = f"gtlcecore:suprachronal_{prev_tier}"
        
        # 构建Java配方
        recipe = f"""
gtr.suprachronal_assembly_line.recipeBuilder("{recipe_id}")
    .notConsumable(RegistriesUtil.getItem("gtlcecore:hyperdimensional_drone"))
    .inputItems(RegistriesUtil.getItem("gtlcecore:timepiece"))
    .inputFluids(RegistriesUtil.getFluid("gtceu:spacetime", {fluid_amount1}))
    .inputFluids(RegistriesUtil.getFluid("gtceu:raw_star_matter_plasma", {fluid_amount2}))
    .inputFluids(RegistriesUtil.getFluid("gtceu:uu_matter", {fluid_amount3}))
    .inputFluids(RegistriesUtil.getFluid("gtceu:periodicium", {fluid_amount4}))
    .outputItems(RegistriesUtil.getItem("{recipe_id}"))
    .duration({duration})
    .circuit({circuit})
    .EUt(GTValues.VA[GTValues.MAX])
    .stationResearch(b -> b.researchStack(RegistriesUtil.getItemStack("{research_stack}"))
        .dataStack(RegistriesUtil.getItemStack("gtceu:data_module"))
        .EUt(GTValues.VA[GTValues.MAX])
        .CWUt(8192))
    .save(provider);"""
        
        java_recipes.append(recipe.strip())
    
    return "\n\n".join(java_recipes)

# 生成所有配方并保存到文件
if __name__ == "__main__":
    recipes = generate_suprachronal_recipes()
    
    with open("suprachronal_recipes_java.txt", "w", encoding="utf-8") as f:
        f.write(recipes)
    
    print("Suprachronal配方已生成到 suprachronal_recipes_java.txt")