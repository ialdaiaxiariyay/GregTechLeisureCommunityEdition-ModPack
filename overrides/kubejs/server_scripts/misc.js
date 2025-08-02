//priority: 99
ServerEvents.recipes((event) => {
    const gtr = event.recipes.gtceu

    event.shaped("gtlcecore:warped_ender_pearl", [
        "ABA",
        "BDB",
        "ABA"
    ], {
        A: "minecraft:bone_meal",
        B: "minecraft:blaze_powder",
        D: "minecraft:ender_pearl"
    })

    event.shaped("gtlcecore:command_wand", [
        "  A",
        " B ",
        "B  "
    ], {
        A: "gtlcecore:command_block_core",
        B: "gtceu:eternity_rod"
    })

    event.shaped("gtlcecore:time_twister_behavior", [
        "CDC",
        "B B",
        "CDC"
    ], {
        D: "gtmthings:wireless_energy_monitor",
        C: "gtmthings:lv_wireless_energy_receive_cover",
        B: "minecraft:clock"
    })

    event.shaped("avaritia:extreme_crafting_table", [
        "ABA",
        "BCB",
        "ABA"
    ], {
        A: "gtceu:exquisite_lapis_gem",
        B: "avaritia:crystal_matrix",
        C: "avaritia:double_compressed_crafting_table"
    })

    gtr.weather_control("1")
        .circuit(1)
        .duration(200)
        .EUt(30)

    gtr.weather_control("2")
        .circuit(2)
        .duration(200)
        .EUt(30)

    gtr.weather_control("3")
        .circuit(3)
        .duration(200)
        .EUt(30)

    gtr.block_conversion("1")
        .circuit(1)
        .duration(400)
        .EUt(128)

    gtr.slaughterhouse("1")
        .circuit(1)
        .duration(20)
        .EUt(128)

    gtr.slaughterhouse("2")
        .circuit(2)
        .duration(20)
        .EUt(128)

    gtr.space_elevator("1")
        .circuit(1)
        .duration(400)
        .CWUt(128)
        .EUt(GTValues.VA[GTValues.UV])

    gtr.door_of_create("1")
        .circuit(1)
        .EUt(4 * GTValues.VA[GTValues.MAX])
        .duration(20)
        .dimension("minecraft:overworld")

    gtr.create_aggregation("1")
        .circuit(1)
        .EUt(16 * GTValues.VA[GTValues.MAX])
        .duration(20)
        .CWUt(GTValues.VA[GTValues.MAX])
        .dimension("gtlcecore:create")

    gtr.electric_blast_furnace("gtlcecore:shining_obsidian")
        .itemInputs("minecraft:obsidian", "gtceu:vibrant_alloy_dust")
        .inputFluids("gtceu:glowstone 576")
        .itemOutputs("gtlcecore:shining_obsidian")
        .EUt(480)
        .duration(600)
        .blastFurnaceTemp(2600)

    gtr.chemical_bath("gtlcecore:ender_obsidian")
        .itemInputs("gtlcecore:shining_obsidian")
        .inputFluids("gtceu:ender_eye 1152")
        .itemOutputs("gtlcecore:ender_obsidian")
        .EUt(480)
        .duration(200)

    gtr.compressor("avaritia:compressed_crafting_table")
        .itemInputs("64x minecraft:crafting_table")
        .itemOutputs("avaritia:compressed_crafting_table")
        .EUt(480)
        .duration(200)
})