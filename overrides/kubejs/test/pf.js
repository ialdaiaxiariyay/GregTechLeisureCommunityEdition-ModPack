    gtr.suprachronal_assembly_line("gtlcecore:create_ultimate_battery")
        .itemInputs("gtceu:magnetohydrodynamicallyconstrainedstarmatter_frame",
            "4x gtlcecore:suprachronal_mainframe_complex",
            "16x gtlcecore:mega_max_battery",
            "16x gtlcecore:max_field_generator",
            "64x gtlcecore:fm_wafer",
            "64x gtlcecore:fm_wafer",
            "64x gtlcecore:fm_wafer",
            "64x gtlcecore:fm_wafer",
            "64x gtlcecore:fm_wafer",
            "64x gtlcecore:fm_wafer",
            "64x gtlcecore:fm_wafer",
            "64x gtlcecore:fm_wafer",
            "16x gtceu:infinity_hex_wire",
            "64x gtceu:magnetohydrodynamicallyconstrainedstarmatter_foil",
            "32x gtceu:magnetohydrodynamicallyconstrainedstarmatter_plate",
            "32x gtceu:double_cosmic_plate")
        .itemOutputs("gtlcecore:create_ultimate_battery")
        .inputFluids("gtceu:infinity 1000", "gtceu:spacetime 1000", "gtceu:eternity 1000", "gtceu:magnetohydrodynamicallyconstrainedstarmatter 1000")
        .EUt(16 * GTValues.VA[GTValues.MAX])
        .duration(8000)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtlcecore:mega_max_battery"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(16384))

     gtr.suprachronal_assembly_line("gtlcecore:max_electric_motor")
        .itemInputs("gtceu:long_magmatter_rod",
            "8x gtceu:long_transcendentmetal_rod",
            "8x gtceu:transcendentmetal_ring",
            "16x gtceu:transcendentmetal_round",
            "64x gtceu:fine_black_dwarf_mtter_wire",
            "64x gtceu:fine_black_dwarf_mtter_wire",
            "64x gtceu:fine_white_dwarf_mtter_wire",
            "64x gtceu:fine_white_dwarf_mtter_wire",
            "16x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 500 * 32, "gtceu:soldering_alloy " + 1000 * 32, "gtceu:lubricant " + 2000 * 32, "gtceu:infinity 576")
        .itemOutputs("gtlcecore:max_electric_motor")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_electric_motor"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(4096))

    gtr.suprachronal_assembly_line("gtlcecore:max_electric_pump")
        .itemInputs("gtlcecore:max_electric_motor",
            "64x gtceu:neutronium_small_fluid_pipe",
            "4x gtceu:transcendentmetal_plate",
            "16x gtceu:transcendentmetal_screw",
            "4x gtceu:double_black_dwarf_mtter_plate",
            "4x gtceu:double_white_dwarf_mtter_plate",
            "gtceu:transcendentmetal_rotor",
            "16x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 576 * 32, "gtceu:soldering_alloy " + 1152 * 32, "gtceu:lubricant " + 2000 * 32, "gtceu:infinity 576")
        .itemOutputs("gtlcecore:max_electric_pump")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_electric_pump"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(4096))

    gtr.suprachronal_assembly_line("gtlcecore:max_conveyor_module")
        .itemInputs("2x gtlcecore:max_electric_motor",
            "4x gtceu:transcendentmetal_plate",
            "8x gtceu:transcendentmetal_ring",
            "32x gtceu:transcendentmetal_round",
            "8x gtceu:transcendentmetal_screw",
            "8x gtceu:white_dwarf_mtter_plate",
            "8x gtceu:black_dwarf_mtter_plate",
            "16x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 576 * 32, "gtceu:lubricant " + 2000 * 32, "gtceu:styrene_butadiene_rubber " + 1152 * (3 + 32), "gtceu:infinity 576")
        .itemOutputs("gtlcecore:max_conveyor_module")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_conveyor_module"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(4096))

    gtr.suprachronal_assembly_line("gtlcecore:max_electric_piston")
        .itemInputs("gtlcecore:max_electric_motor",
            "8x gtceu:transcendentmetal_plate",
            "8x gtceu:transcendentmetal_ring",
            "32x gtceu:transcendentmetal_round",
            "8x gtceu:transcendentmetal_rod",
            "2x gtceu:transcendentmetal_gear",
            "4x gtceu:small_transcendentmetal_gear",
            "16x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 576 * 32, "gtceu:soldering_alloy " + 1152 * 32, "gtceu:lubricant " + 2000 * 32, "gtceu:infinity 576")
        .itemOutputs("gtlcecore:max_electric_piston")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_electric_piston"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(4096))

    gtr.suprachronal_assembly_line("gtlcecore:max_robot_arm")
        .itemInputs("8x gtceu:long_transcendentmetal_rod",
            "2x gtceu:transcendentmetal_gear",
            "6x gtceu:small_transcendentmetal_gear",
            "4x gtlcecore:max_electric_motor",
            "gtlcecore:max_electric_piston",
            "#gtceu:circuits/max",
            "2x #gtceu:circuits/opv",
            "4x #gtceu:circuits/uxv",
            "16x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 576 * 32, "gtceu:soldering_alloy " + 1152 * 32, "gtceu:lubricant " + 2000 * 32, "gtceu:infinity 576")
        .itemOutputs("gtlcecore:max_robot_arm")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_robot_arm"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(4096))

    gtr.suprachronal_assembly_line("gtlcecore:max_emitter")
        .itemInputs("gtceu:infinity_frame",
            "gtlcecore:max_electric_motor",
            "8x gtceu:long_transcendentmetal_rod",
            "4x gtlcecore:nuclear_star",
            "2x #gtceu:circuits/max",
            "64x gtceu:white_dwarf_mtter_foil",
            "64x gtceu:black_dwarf_mtter_foil",
            "64x gtceu:shirabon_foil",
            "64x gtceu:cosmic_foil",
            "32x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 1152 * 32, "gtceu:soldering_alloy " + 2304 * 32, "gtceu:infinity 576")
        .itemOutputs("gtlcecore:max_emitter")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_emitter"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(6114))

    gtr.suprachronal_assembly_line("gtlcecore:max_sensor")
        .itemInputs("gtceu:infinity_frame",
            "gtlcecore:max_electric_motor",
            "8x gtceu:transcendentmetal_plate",
            "4x gtlcecore:nuclear_star",
            "2x #gtceu:circuits/max",
            "64x gtceu:white_dwarf_mtter_foil",
            "64x gtceu:black_dwarf_mtter_foil",
            "64x gtceu:shirabon_foil",
            "64x gtceu:cosmic_foil",
            "32x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 1152 * 32, "gtceu:soldering_alloy " + 2304 * 32, "gtceu:infinity 576")
        .itemOutputs("gtlcecore:max_sensor")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_sensor"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(6114))

    gtr.suprachronal_assembly_line("gtlcecore:max_field_generator")
        .itemInputs("gtceu:infinity_frame",
            "12x gtceu:chaos_plate",
            "4x gtlcecore:nuclear_star",
            "2x gtlcecore:max_emitter",
            "2x #gtceu:circuits/max",
            "64x gtceu:fine_white_dwarf_mtter_wire",
            "64x gtceu:fine_black_dwarf_mtter_wire",
            "64x gtceu:fine_shirabon_wire",
            "64x gtceu:fine_cosmic_wire",
            "32x gtceu:cosmicneutronium_single_cable")
        .inputFluids("gtceu:super_mutated_living_solder " + 1152 * 32, "gtceu:soldering_alloy " + 2304 * 32, "gtceu:infinity 576")
        .itemOutputs("gtlcecore:max_field_generator")
        .EUt(GTValues.VA[GTValues.MAX])
        .duration(1200)
        .stationResearch(b => b.researchStack(Registries.getItemStack("gtceu:opv_field_generator"))
            .dataStack(Registries.getItemStack("gtceu:data_module"))
            .EUt(GTValues.VA[GTValues.MAX])
            .CWUt(6114))
