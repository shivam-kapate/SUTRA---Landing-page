import { ExperimentStep, ResearchPaper } from '../types';

export const EXPERIMENT_PROTOCOLS: Record<string, { name: string; category: string; targetPayload: string; steps: ExperimentStep[] }> = {
  'bio-incubation': {
    name: 'Biological Sample Incubation Protocol (BIO-SAMP-04)',
    category: 'Life Sciences / Microgravity Cellular Assay',
    targetPayload: 'BAS Experiment Glovebox Unit #2',
    steps: [
      {
        id: 1,
        title: 'Tool Extraction & Sterilization Check',
        description: 'Retrieve micropipette P1000 from magnetic tether rack and verify UV-C sterilization tag.',
        status: 'completed',
        confidence: 98.7,
        expectedDuration: '00:45',
        actualDuration: '00:41',
        validationCheck: 'YOLOv11: Pipette detected in hand orientation with UV-C seal removed',
        toolInUse: 'Micropipette P1000'
      },
      {
        id: 2,
        title: 'Sample Transfer via Micropipette',
        description: 'Aspirate 250µL of bio-reagent from Cryo-Vial #A3 into the cell growth chamber without introducing bubble cavitation.',
        status: 'in_progress',
        confidence: 96.4,
        expectedDuration: '01:30',
        actualDuration: '00:54',
        validationCheck: 'Video Swin + HO-RCNN: Hand-Vial contact verified, zero-g meniscus angle normal',
        toolInUse: 'Sample Vial A3 + Micropipette'
      },
      {
        id: 3,
        title: 'Chemical Reagent Mixing & Agitation',
        description: 'Inject catalyst enzyme into chamber and engage vortex orbital mixer at 300 RPM for 15 seconds.',
        status: 'pending',
        confidence: 94.1,
        expectedDuration: '00:30',
        validationCheck: '1D-TCN: Sequential step timing check, vortex switch activation event',
        toolInUse: 'Vortex Mixer Bay 1'
      },
      {
        id: 4,
        title: 'Incubation Lock & Thermal Seal',
        description: 'Fasten chamber pressure lid, secure dual locking pins, and verify incubator temperature set to 37.0°C ± 0.2°C.',
        status: 'pending',
        confidence: 99.1,
        expectedDuration: '00:40',
        validationCheck: 'Optical inspection: Dual safety latch engaged + telemetry thermal probe sync',
        toolInUse: 'Incubator Module Chamber'
      }
    ]
  },
  'crystal-growth': {
    name: 'Protein Crystal Growth Vapor Diffusion (PCG-VD-01)',
    category: 'Biochemical Crystallography',
    targetPayload: 'Crystallization Facility Rack 04',
    steps: [
      {
        id: 1,
        title: 'Well Plate Unsealing',
        description: 'Peel micro-film barrier from crystallization well array with ESD tweezers.',
        status: 'completed',
        confidence: 99.2,
        expectedDuration: '00:30',
        actualDuration: '00:28',
        validationCheck: 'Optical film edge detection: 100% clear aperture',
        toolInUse: 'ESD Tweezers'
      },
      {
        id: 2,
        title: 'Hanging Drop Deposition',
        description: 'Deposit 2.5µL of protein solution onto cover slip center.',
        status: 'in_progress',
        confidence: 95.8,
        expectedDuration: '01:10',
        actualDuration: '00:35',
        validationCheck: 'HO-RCNN: Droplet droplet surface tension geometry in micro-g',
        toolInUse: 'Micro-dispenser'
      },
      {
        id: 3,
        title: 'Hermetic Chamber Inversion',
        description: 'Invert glass slide over reservoir containing 1.2M ammonium sulfate buffer.',
        status: 'pending',
        confidence: 97.0,
        expectedDuration: '00:45',
        validationCheck: '1D-TCN: Slide flip rotation angle = 180° verified',
        toolInUse: 'Glass Slide Carrier'
      }
    ]
  }
};

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'p1',
    title: 'Video Swin Transformer',
    authors: 'Z. Liu, J. Ning, Y. Cao, Y. Wei, Z. Zhang, S. Lin, H. Hu',
    venue: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)',
    year: 2022,
    category: 'Vision & Perception',
    summary: 'Hierarchical spatio-temporal vision transformer using shifted windows, serving as SUTRA’s temporal feature backbone for 3D gesture & tool dynamics under microgravity.',
    doiOrUrl: 'https://arxiv.org/abs/2106.13230',
    badge: 'CVPR 2022 Oral'
  },
  {
    id: 'p2',
    title: 'What is YOLOv8 / YOLOv11: Real-Time Edge Vision',
    authors: 'H. Lou, L. Chen, J. Glenn, et al.',
    venue: 'Ultralytics & arXiv Edge Computing',
    year: 2024,
    category: 'Vision & Perception',
    summary: 'Ultra-efficient backbone yielding < 12ms inference per frame on NVIDIA Jetson AGX Orin for floating micro-tools and astronaut hand bounding boxes.',
    doiOrUrl: 'https://arxiv.org/abs/2408.15858',
    badge: 'arXiv 2024'
  },
  {
    id: 'p3',
    title: 'Hand-Object Interaction Detection With Fully Convolutional Networks',
    authors: 'J. Schröder, A. Farshad, B. Busam, N. Navab',
    venue: 'IEEE CVPR Workshops (CVPRW)',
    year: 2017,
    category: 'Temporal Modeling',
    summary: 'Spatial-relational HO-RCNN architecture adapted by SUTRA to identify tool grasping vs accidental floating drifts in ISS/Gaganyaan experiment gloveboxes.',
    doiOrUrl: 'https://openaccess.thecvf.com/',
    badge: 'IEEE CVPRW'
  },
  {
    id: 'p4',
    title: 'Temporal Convolutional Networks: A Unified Approach to Action Segmentation',
    authors: 'C. Lea, M. D. Flynn, R. Vidal, A. Reiter, G. D. Hager',
    venue: 'IEEE Conference on Computer Vision and Pattern Recognition (CVPR)',
    year: 2017,
    category: 'Temporal Modeling',
    summary: 'Dilated 1D-TCN encoder-decoder network providing causal multi-scale temporal receptive fields for exact sub-action boundary detection and skipped-step alerting.',
    doiOrUrl: 'https://arxiv.org/abs/1611.05267',
    badge: 'IEEE CVPR'
  },
  {
    id: 'p5',
    title: 'The Llama 3 Herd of Models: Quantized Edge Capabilities',
    authors: 'Meta AI Research Team',
    venue: 'Meta AI Technical Report',
    year: 2024,
    category: 'Cognitive LLM',
    summary: '4-bit GGUF quantized Llama-3-8B running on Jetson Orin unified memory at 28 tokens/sec, enabling 100% offline conversational SOP adherence without ground uplink.',
    doiOrUrl: 'https://arxiv.org/abs/2407.21783',
    badge: 'Technical Report'
  },
  {
    id: 'p6',
    title: 'Billion-Scale Similarity Search with GPUs (FAISS)',
    authors: 'J. Johnson, M. Douze, H. Jégou',
    venue: 'IEEE Transactions on Big Data',
    year: 2019,
    category: 'Cognitive LLM',
    summary: 'GPU-accelerated vector indexing providing < 3ms semantic lookups over ISRO flight manuals, experiment safety protocols, and contingency procedures.',
    doiOrUrl: 'https://ieeexplore.ieee.org/document/8733051',
    badge: 'IEEE TBD'
  },
  {
    id: 'p7',
    title: 'Human Space Flight Mission Framework & Onboard Operations',
    authors: 'Human Space Flight Centre (HSFC), ISRO',
    venue: 'Gaganyaan Space Station & BAS Operational Standards',
    year: 2024,
    category: 'Edge Systems',
    summary: 'Baseline guidelines for autonomous crew support, glovebox ergonomics, and zero-telemetry-loss payload validation for Indian space missions.',
    doiOrUrl: 'https://www.isro.gov.in/',
    badge: 'ISRO HSFC'
  },
  {
    id: 'p8',
    title: 'Jetson AGX Orin Architecture for Autonomous Edge Perception',
    authors: 'NVIDIA Autonomous Systems Group',
    venue: 'NVIDIA Technical Whitepaper',
    year: 2023,
    category: 'Edge Systems',
    summary: '275 TOPS Ampere architecture delivering multi-stream TensorRT acceleration within the 15W–60W power envelope of space-rated avionics enclosures.',
    doiOrUrl: 'https://www.nvidia.com/jetson-orin',
    badge: 'NVIDIA Edge'
  }
];

export const LATENCY_BENCHMARK_DATA = [
  { module: 'Pre-Processing / Decode', edgeOrin: 4, cloudRelay: 280, unit: 'ms' },
  { module: 'YOLOv11 Detection', edgeOrin: 12, cloudRelay: 650, unit: 'ms' },
  { module: 'Video Swin Pose/Tool', edgeOrin: 28, cloudRelay: 940, unit: 'ms' },
  { module: '1D-TCN Action Boundary', edgeOrin: 6, cloudRelay: 350, unit: 'ms' },
  { module: 'FAISS Semantic Match', edgeOrin: 3, cloudRelay: 420, unit: 'ms' },
  { module: 'End-to-End Total', edgeOrin: 53, cloudRelay: 2640, unit: 'ms' },
];

export const BANDWIDTH_BENCHMARK_DATA = [
  { mode: 'Raw 4K/60fps Video Uplink', dataRateMBs: 48.0, description: 'Continuous ground downlink (saturated bandwidth, prone to LOS blackout)' },
  { mode: 'H.265 Compressed Stream', dataRateMBs: 6.5, description: 'Heavy compression artifacts, 3-5 sec telemetry queue delay' },
  { mode: 'SUTRA Edge Vector Telemetry', dataRateMBs: 0.08, description: '99.8% reduction — transmits only JSON state vectors, alerts & action timestamps' },
];

export const SUGGESTED_QUERIES = [
  "What is the incubation temperature for Sample B?",
  "How to handle microgravity fluid bubble cavitation?",
  "Confirm pipette tip angle for cell culture vial A3.",
  "What is the contingency protocol if Step 3 reagent mixes early?",
  "Verify UV-C glovebox sterilization checklist."
];

export const PRESET_RAG_ANSWERS: Record<string, { answer: string; citation: { manual: string; section: string; similarityScore: number; chunkText: string } }> = {
  "What is the incubation temperature for Sample B?": {
    answer: "According to ISRO BAS Payload Manual Sec 4.2.1, Sample B (Mammalian Lymphocyte Assay) must be stabilized at 37.0°C ± 0.2°C with a 5% CO2 atmospheric mix. The chamber thermal locks must remain latched for a minimum incubation period of 240 minutes.",
    citation: {
      manual: "ISRO-BAS-BIO-MAN-004",
      section: "Section 4.2.1 — Thermal Equilibrium & Gas Regulation",
      similarityScore: 0.942,
      chunkText: "Param: Temp=37.0C(+/-0.2); Gas=5% CO2 balanced N2; Lock dual latch pins prior to heater enable cycle."
    }
  },
  "How to handle microgravity fluid bubble cavitation?": {
    answer: "Under microgravity, surface tension dominates over buoyancy. To dislodge trapped microbubbles without ground intervention: (1) Tilt the syringe/pipette to a 45° angle against the hydro-gel boundary, (2) Apply gentle 2Hz cyclic aspiration, and (3) Activate the ultrasonic settling transducer for 4 seconds.",
    citation: {
      manual: "SUTRA-Z-GRAV-SOP-11",
      section: "Section 8.1 — Fluid Dynamics & Meniscus Stabilization",
      similarityScore: 0.968,
      chunkText: "Protocol: 45deg contact line tilt, 2Hz cyclic pulse, enable piezo ultrasonic de-bubbler pin 04."
    }
  },
  "Confirm pipette tip angle for cell culture vial A3.": {
    answer: "The SOP specifies an insertion angle between 35° and 45° relative to the vial longitudinal axis. This prevents vacuum seal disruption and avoids splashing the fluid droplet onto the glovebox optical viewport.",
    citation: {
      manual: "ISRO-BAS-BIO-MAN-004",
      section: "Section 3.1.4 — Micropipetting Ergonomics",
      similarityScore: 0.915,
      chunkText: "Insertion criteria: Angle 40 +/- 5 deg. Prevent tool tip collision with optical sensor plane."
    }
  },
  "What is the contingency protocol if Step 3 reagent mixes early?": {
    answer: "If reagent mixing is initiated before step 2 completion: (1) Immediately record timestamp in telemetry log, (2) Do not engage the high-speed vortex mixer, (3) Sample viability will degrade if uncooled past 12 minutes, (4) Switch to Contingency Protocol C-08 (Quick Cryo-Fixation).",
    citation: {
      manual: "SUTRA-SAFETY-CONTINGENCY-REV2",
      section: "Section 12.4 — Out-of-Sequence Reagent Remediation",
      similarityScore: 0.953,
      chunkText: "Contingency C-08: Halt agitation, switch payload cooling bay to -4C quench, log event hash to onboard flash."
    }
  },
  "Verify UV-C glovebox sterilization checklist.": {
    answer: "Pre-experiment UV-C checklist: (1) Viewport safety shutter closed, (2) Glove seals pressurized at 1.05 atm, (3) UV-C emitter active at 254nm for 15 minutes, (4) Optical sensor calibration check passed with 0 LUX ambient interference.",
    citation: {
      manual: "ISRO-BAS-BIO-MAN-004",
      section: "Section 1.3 — Bio-Safety & Decontamination",
      similarityScore: 0.979,
      chunkText: "UV-C 254nm emitter duration 900s; optical feedback verify sensor blackout before emission cycle."
    }
  }
};
