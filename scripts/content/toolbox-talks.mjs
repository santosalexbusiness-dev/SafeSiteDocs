// Real, ready-to-use content for all 51 non-sample weekly toolbox talks.
// Each renders under the standard "## Toolbox Talk" heading with the shared
// header/footer added by the generator.

const SIGNIN = `---

**Attendance / Sign-In** — Date: [DATE]   Supervisor: [NAME]   Location: [JOBSITE]   Duration: ~5 min

| # | Print Name | Signature |
|---|---|---|
| 1 |  |  |
| 2 |  |  |
| 3 |  |  |
| 4 |  |  |
| 5 |  |  |
| 6 |  |  |
| 7 |  |  |
| 8 |  |  |

**Questions raised by crew:** [____]   **Follow-up needed:** [____]`;

const talk = (topic, lesson, hazards, questions, checklist) => ({
  body: `**Topic:** ${topic}

**5-Minute Lesson**
${lesson}

**Key Hazards**
${hazards}

**Discussion Questions**
${questions}

**Crew Checklist**
${checklist}

${SIGNIN}`,
});

export default {
  "tbt-02-ladder-safety": talk(
    "Ladder Safety",
    `- Pick the right ladder for the job and the right duty rating for your weight plus tools.
- Inspect it before every use; tag and remove damaged ladders from service.
- Set extension ladders at about a 4-to-1 angle, on firm level ground, secured top and bottom, extending about 3 feet above the landing.
- Keep three points of contact, face the ladder, and keep your belt buckle between the rails — don't overreach.
- Don't stand on the top two rungs of a stepladder, and use non-conductive ladders near electrical hazards.`,
    `- Falls from height due to slipping, overreaching, or unstable setup
- Ladder sliding out at the base or tipping sideways
- Contact with overhead power lines using metal ladders
- Overloading beyond the duty rating`,
    `1. Is the ladder we're using rated for the load and the right type for the task?
2. Did we inspect it, and is it secured on stable ground?
3. Are there power lines or openings nearby we need to plan around?`,
    `- [ ] Correct ladder type and duty rating
- [ ] Inspected, no damage
- [ ] Set at correct angle, level, and secured
- [ ] Three points of contact; no overreaching`
  ),

  "tbt-03-scaffold-awareness": talk(
    "Scaffold Awareness",
    `- Only use a scaffold that a competent person has erected and inspected — look for the inspection tag before you climb on.
- A green tag means ready to use; yellow means use with caution per the tag; red means do not use.
- Make sure it's fully planked, has guardrails where required, and safe access (a ladder or stair — never climb the cross-braces).
- Don't overload it with material, keep platforms clear of debris, and watch for power lines.
- Report damage, missing components, or anything that's been altered.`,
    `- Falls from open or incomplete platforms
- Scaffold collapse from overloading or missing components
- Falling tools or material striking workers below
- Electrocution from contact with nearby power lines`,
    `1. Is there a current inspection tag on the scaffold we're using today?
2. Are guardrails, planking, and access all in place?
3. How are we keeping tools and material from falling on people below?`,
    `- [ ] Current inspection tag present (green)
- [ ] Fully planked with guardrails and safe access
- [ ] Not overloaded; platform clear
- [ ] Falling-object protection in place`
  ),

  "tbt-04-ppe-basics": talk(
    "PPE Basics",
    `- PPE is the last line of defense — we still eliminate or control hazards first, then use PPE for what's left.
- Wear what the task and site require: head, eye, hand, foot, hearing, and high-visibility protection as needed.
- Inspect your PPE before use; replace anything cracked, torn, worn, or expired.
- PPE has to fit and be worn correctly to work — a loose hard hat or safety glasses pushed up don't protect you.
- Know where to get replacements and ask if you're unsure what's required.`,
    `- Wrong or missing PPE for the hazard present
- Damaged or expired PPE that no longer protects
- Poor fit that reduces protection
- Eye, head, hand, and foot injuries from skipping PPE`,
    `1. What PPE does today's work actually require?
2. Is everyone's PPE in good condition and worn correctly?
3. Where do we get replacements if something's damaged?`,
    `- [ ] Required PPE identified for the task
- [ ] PPE inspected and in good condition
- [ ] Fits and is worn correctly
- [ ] Replacements available`
  ),

  "tbt-05-eye-and-face-protection": talk(
    "Eye and Face Protection",
    `- Most eye injuries are preventable with the right protection worn correctly.
- Use safety glasses with side protection as a baseline; add goggles for dust, chips, or chemical splash, and a face shield over glasses/goggles for grinding, cutting, or chemical work.
- Match the protection to the hazard — impact, dust, splash, or optical radiation (welding) all need different gear.
- Keep lenses clean and scratch-free so people actually keep them on.
- Know where the eyewash is and how to use it before you start chemical or dusty work.`,
    `- Flying particles from grinding, cutting, chipping, or nailing
- Chemical splash to the eyes or face
- Dust and debris, especially overhead work
- Optical radiation from welding or cutting`,
    `1. What could get in our eyes on today's tasks?
2. Do we need a face shield over glasses for any of it?
3. Where is the nearest eyewash and is it working?`,
    `- [ ] Safety glasses with side protection worn
- [ ] Goggles/face shield for splash or grinding
- [ ] Lenses clean and clear
- [ ] Eyewash location known`
  ),

  "tbt-06-hand-protection": talk(
    "Hand Protection",
    `- Hands are involved in a huge share of jobsite injuries — cuts, pinches, punctures, burns, and chemical contact.
- Choose gloves for the hazard: cut-resistant for sharp materials, chemical-resistant for chemicals, insulated for heat or electrical work.
- Keep hands out of the "line of fire" and pinch points; never put a hand where you wouldn't put your face.
- Don't wear gloves near rotating equipment that can grab them.
- Inspect gloves and replace them when worn or contaminated; wash hands after handling chemicals.`,
    `- Lacerations and punctures from sharp edges and tools
- Pinch points and crush injuries
- Chemical burns and skin absorption
- Gloves caught in rotating equipment`,
    `1. What's the main hand hazard in today's work?
2. Do we have the right glove type for it?
3. Where are the pinch points and line-of-fire spots to avoid?`,
    `- [ ] Correct glove type for the hazard
- [ ] Gloves inspected, not worn or contaminated
- [ ] Hands kept clear of pinch points
- [ ] No gloves near rotating equipment`
  ),

  "tbt-07-foot-protection": talk(
    "Foot Protection",
    `- Wear sturdy work boots that meet your company's requirement — safety-toe and puncture-resistant soles where the work calls for it.
- Watch for nails, rebar, and sharp debris; keep walkways clear to prevent punctures and trips.
- Slip-resistant soles matter on wet, muddy, or sloped surfaces.
- Keep laces tied and boots in good shape — worn soles and broken boots are a hazard themselves.
- Metatarsal guards or special footwear may be needed for heavy material handling.`,
    `- Punctures from nails, rebar, and sharp debris
- Crushing from dropped or rolling material
- Slips on wet, muddy, or uneven ground
- Worn-out footwear that no longer protects`,
    `1. Are there puncture or crush hazards in today's work area?
2. Is everyone's footwear appropriate and in good shape?
3. Where do we need extra care for slips?`,
    `- [ ] Proper safety footwear worn
- [ ] Puncture/crush hazards identified
- [ ] Walkways clear of debris
- [ ] Footwear in good condition`
  ),

  "tbt-08-head-protection": talk(
    "Head Protection",
    `- Wear your hard hat any time there's a risk of falling or flying objects, bumping fixed objects, or electrical contact.
- Use the right type and class for the hazard — including electrical-rated hats where there's a shock risk.
- Adjust the suspension for a snug fit; the gap between shell and head is what absorbs impact.
- Inspect for cracks, dents, and UV damage; replace after any significant impact and per the manufacturer's schedule.
- Don't store it in direct sun on the dash, and follow rules on wearing it backward (only if rated for it).`,
    `- Falling tools, material, or debris from above
- Bumping into fixed objects and overhead obstructions
- Electrical contact in some tasks
- Degraded hard hats that no longer protect`,
    `1. Is there overhead work or falling-object risk today?
2. Is everyone's hard hat in good condition and adjusted to fit?
3. Do any tasks need an electrical-rated hard hat?`,
    `- [ ] Hard hats worn where required
- [ ] Correct type/class for the hazard
- [ ] Suspension adjusted, snug fit
- [ ] No cracks, dents, or heavy UV damage`
  ),

  "tbt-09-hearing-protection": talk(
    "Hearing Protection",
    `- Noise-induced hearing loss builds up gradually and is permanent — but it's completely preventable.
- A good rule of thumb: if you have to raise your voice to be heard an arm's length away, it's loud enough to protect your hearing.
- Use earplugs or muffs rated for the noise; for very high noise, double up (plugs and muffs).
- Insert earplugs correctly (roll, pull the ear up and back, insert) or they don't work.
- Limit time near the loudest tools and rotate tasks when you can.`,
    `- Permanent hearing loss from loud tools and equipment
- Ringing in the ears (tinnitus)
- Poorly inserted plugs giving false protection
- Long exposure without breaks`,
    `1. Which tools or areas are loud enough to need protection today?
2. Is everyone using hearing protection correctly?
3. Can we reduce exposure by distance or rotation?`,
    `- [ ] Hearing protection available and worn in noisy areas
- [ ] Correct rating for the noise level
- [ ] Plugs inserted correctly
- [ ] Exposure time managed`
  ),

  "tbt-10-respiratory-protection-awareness": talk(
    "Respiratory Protection Awareness",
    `- Some dusts, fumes, vapors, and mists can harm your lungs — you can't always see or smell the danger.
- If a task requires a respirator, it's part of a full program: hazard assessment, medical clearance, fit testing, and training come first.
- Control the hazard at the source when possible (ventilation, wet methods, vacuums) so you rely less on respirators.
- A respirator only works if it's the right type, fits, and seals — facial hair under the seal breaks it.
- Voluntary dust-mask use has its own rules; ask before assuming a paper mask is enough.`,
    `- Inhaling silica, wood, or other harmful dusts
- Fumes and vapors from chemicals, paints, or hot work
- Wrong respirator or cartridge for the hazard
- Poor seal from fit issues or facial hair`,
    `1. Could today's task put harmful dust or fumes in the air?
2. Are we controlling it at the source first?
3. Is anyone using a respirator without being in the program?`,
    `- [ ] Airborne hazards identified
- [ ] Source controls (ventilation/wet methods) used
- [ ] Respirator users medically cleared and fit-tested
- [ ] Correct respirator and cartridge`
  ),

  "tbt-11-heat-stress": talk(
    "Heat Stress",
    `- Heat illness can move fast and become an emergency — know the signs and act early.
- Water, rest, and shade are the core: drink small amounts often, take breaks in the shade, and pace the work in the heat.
- New and returning workers need to acclimatize — ease into hot work over several days.
- Watch each other. Heat exhaustion (heavy sweating, dizziness, nausea) can become heat stroke (confusion, no sweat or hot skin, fainting), which is a 911 emergency.
- For heat stroke, call 911 and cool the person aggressively right away.`,
    `- Heat exhaustion progressing to heat stroke
- Dehydration and cramps
- Higher risk for new/unacclimatized workers
- Heavy PPE and direct sun adding heat load`,
    `1. How hot will it get, and what's our water/rest/shade plan?
2. Is anyone new or returning who needs to take it easier today?
3. Does everyone know the signs and what to do for heat stroke?`,
    `- [ ] Cool water close and stocked
- [ ] Shade/rest area available
- [ ] Acclimatization for new workers
- [ ] Crew knows heat-illness signs and 911 response`
  ),

  "tbt-12-cold-stress": talk(
    "Cold Stress",
    `- Cold, wind, and wet conditions can cause hypothermia and frostbite, and make surfaces slick.
- Dress in layers, keep dry, and cover the head and hands; bring a change of clothes if you might get wet.
- Take warm-up breaks, and keep moving to stay warm without sweating heavily.
- Know the signs: shivering, slurred speech, and clumsiness (hypothermia); numb, white, waxy skin (frostbite).
- Watch for ice on walkways, ladders, and scaffolds.`,
    `- Hypothermia from prolonged cold/wet exposure
- Frostbite on exposed skin, fingers, and toes
- Slips on ice and snow
- Reduced dexterity and grip in the cold`,
    `1. What are the conditions and how long are we exposed?
2. Is everyone dressed in layers and able to stay dry?
3. Where's ice a hazard, and when are warm-up breaks?`,
    `- [ ] Layered, dry clothing; head/hands covered
- [ ] Warm-up breaks planned
- [ ] Ice hazards identified and treated
- [ ] Crew knows cold-stress signs`
  ),

  "tbt-13-hydration-on-the-jobsite": talk(
    "Hydration on the Jobsite",
    `- By the time you feel thirsty you're already behind — drink water regularly throughout the shift.
- A good target in heat is about a cup of water every 15-20 minutes; keep cool water within easy reach.
- Skip energy drinks and limit a lot of caffeine on hot days — they don't replace what you sweat out.
- Dark urine, headache, and cramps are early dehydration signs; speak up early.
- Eat regular meals; you lose salts when you sweat heavily.`,
    `- Dehydration leading to cramps and heat illness
- Reduced focus and slower reactions
- Over-reliance on caffeine/energy drinks
- Not drinking until already thirsty`,
    `1. Is there enough cool water for the whole crew and shift?
2. Are we taking real water breaks, not just at lunch?
3. Does anyone have early signs of dehydration?`,
    `- [ ] Cool water stocked and reachable
- [ ] Regular water breaks scheduled
- [ ] Crew watching for dehydration signs
- [ ] Meals/electrolytes for heavy-sweat days`
  ),

  "tbt-14-hazard-communication": talk(
    "Hazard Communication",
    `- You have a right to know about the chemicals you work with — that's what HazCom is about.
- Every chemical should have a label and a Safety Data Sheet (SDS); know where the SDS binder or app is.
- Read the label: product name, hazards, pictograms, and precautions before you use a product.
- Use the right PPE and ventilation listed on the label/SDS, and store chemicals properly.
- Never use a product from an unlabeled container — when in doubt, ask.`,
    `- Exposure to harmful chemicals through skin, eyes, or breathing
- Using a product without knowing its hazards
- Unlabeled or mislabeled containers
- Improper storage causing reactions or spills`,
    `1. What chemicals are we using today and where are the SDSs?
2. What PPE and ventilation do the labels call for?
3. Are all containers labeled correctly?`,
    `- [ ] Chemicals labeled correctly
- [ ] SDS accessible for each product
- [ ] PPE/ventilation per label and SDS
- [ ] Proper storage in place`
  ),

  "tbt-15-sds-basics": talk(
    "SDS Basics",
    `- A Safety Data Sheet (SDS) tells you how to use a chemical safely and what to do if something goes wrong.
- SDSs follow a standard 16-section format — the most-used sections are hazards, first aid, handling/storage, exposure controls/PPE, and spill response.
- Know how to find an SDS fast (binder or app) — you need it most during an emergency or exposure.
- Check the first-aid section before you start so you know the response if there's contact.
- If you can't find an SDS for a product on site, report it.`,
    `- Not knowing first-aid or spill steps during an emergency
- Missing or outdated SDSs
- Misreading hazards or PPE requirements
- New products brought on site without an SDS`,
    `1. Can everyone locate an SDS in under a minute right now?
2. What does the SDS say for first aid on today's chemicals?
3. Are any products on site missing an SDS?`,
    `- [ ] SDS location known and accessible
- [ ] First-aid and spill sections reviewed
- [ ] PPE matches the SDS
- [ ] Missing SDSs reported`
  ),

  "tbt-16-chemical-labeling": talk(
    "Chemical Labeling",
    `- Labels are your quick reference for hazards — never trust your memory over the label.
- Manufacturer labels include the product name, signal word, pictograms, hazard and precautionary statements.
- When you pour a product into another container, it needs a secondary container label (product name and hazards) unless you use it all yourself immediately.
- Don't use or store anything from an unlabeled or damaged-label container.
- Replace labels that are worn or unreadable.`,
    `- Using chemicals from unlabeled containers
- Wrong product used because labels were missing
- Damaged or faded labels
- Secondary containers left unlabeled`,
    `1. Are all primary and secondary containers labeled?
2. Do we have labels and markers for secondary containers?
3. What do we do with an unlabeled container we find?`,
    `- [ ] All containers labeled and legible
- [ ] Secondary container labels used
- [ ] Damaged labels replaced
- [ ] Unlabeled containers set aside and reported`
  ),

  "tbt-17-lockout-tagout-awareness": talk(
    "Lockout/Tagout Awareness",
    `- Equipment that can start up or release stored energy during service can kill — lockout/tagout keeps it safe.
- Only authorized, trained employees apply locks and tags following the equipment-specific procedure.
- Affected employees must never remove or bypass someone else's lock or tag.
- "Test before touch": after isolating and locking out, verify zero energy before work begins.
- Account for all energy types — electrical, hydraulic, pneumatic, mechanical, thermal, and stored energy.`,
    `- Unexpected energization or start-up during service
- Release of stored energy (pressure, springs, gravity)
- Removing or bypassing another person's lock
- Incomplete isolation of all energy sources`,
    `1. Does today's work need lockout/tagout, and who is authorized?
2. Have we identified every energy source on the equipment?
3. How do we verify zero energy before touching it?`,
    `- [ ] LOTO needed identified; authorized person assigned
- [ ] Equipment-specific procedure followed
- [ ] All energy sources isolated and locked
- [ ] Zero-energy verified before work`
  ),

  "tbt-18-electrical-shock-prevention": talk(
    "Electrical Shock Prevention",
    `- Treat every wire and conductor as energized until it's tested and verified dead.
- Use GFCI protection on temporary power and inspect cords and tools for damage before use.
- Keep yourself, tools, ladders, and equipment well clear of overhead power lines.
- De-energize and lock out before working on circuits whenever feasible; energized work is for qualified persons with proper controls only.
- Keep panels closed and labeled, and maintain clear working space in front of electrical panels.`,
    `- Shock and electrocution from contact with live parts
- Contact with overhead or underground power lines
- Damaged cords, tools, and missing GFCI protection
- Working hot without qualification or controls`,
    `1. Where are the electrical hazards and power lines today?
2. Is our temporary power GFCI-protected and are cords intact?
3. Can the circuit be de-energized and locked out for this task?`,
    `- [ ] Circuits treated as live until verified dead
- [ ] GFCI protection in use; cords/tools inspected
- [ ] Clearance from power lines maintained
- [ ] De-energize/LOTO where feasible`
  ),

  "tbt-19-extension-cord-safety": talk(
    "Extension Cord Safety",
    `- Use heavy-duty cords rated for the load and for outdoor/jobsite use, and protect them with GFCI.
- Inspect cords before use: no cuts, exposed wires, damaged insulation, or missing ground pins — remove damaged cords from service.
- Keep cords out of water, walkways, and pinch points; don't run them through doorways that crush them or across sharp edges.
- Don't daisy-chain cords or overload them, and unplug by the plug, not the cord.
- Keep connections up off wet ground.`,
    `- Shock from damaged cords or missing ground pins
- Tripping hazards from cords in walkways
- Overheating from overloaded or coiled cords
- Water contact at connections`,
    `1. Are our cords rated for the job and GFCI-protected?
2. Did we inspect them, and is anything damaged?
3. Where are cords creating trip or pinch hazards?`,
    `- [ ] Heavy-duty, properly rated cords
- [ ] Inspected; ground pin intact
- [ ] GFCI protection in use
- [ ] Routed clear of water and walkways`
  ),

  "tbt-20-temporary-power-safety": talk(
    "Temporary Power Safety",
    `- Temporary power on the jobsite has to be installed and maintained safely — GFCI protection is required on receptacle circuits used for construction.
- Use an assured equipment grounding program or GFCIs; test GFCIs regularly.
- Protect temporary wiring from damage, keep it elevated and out of walkways, and weatherproof connections.
- Spider boxes and temporary panels must be labeled, covered, and not overloaded.
- Report tampering, damage, or missing covers immediately.`,
    `- Shock from non-GFCI or damaged temporary circuits
- Overloaded temporary panels and spider boxes
- Wiring damaged by traffic, water, or material
- Missing covers and unlabeled circuits`,
    `1. Is all temporary power GFCI-protected and tested?
2. Are panels and spider boxes covered, labeled, and not overloaded?
3. Where could temporary wiring get damaged?`,
    `- [ ] GFCI protection verified/tested
- [ ] Panels labeled, covered, not overloaded
- [ ] Wiring protected and elevated
- [ ] Damage/tampering reported`
  ),

  "tbt-21-power-tool-safety": talk(
    "Power Tool Safety",
    `- Use the right tool for the job and read the guard and safety features — never remove or defeat a guard.
- Inspect the tool, cord, and bit/blade before use; remove damaged tools from service.
- Keep both hands in control, secure your workpiece, and keep your body out of the line of the blade.
- Disconnect power before changing blades/bits and when clearing jams.
- Wear eye protection and the right PPE; watch cords, hoses, and bystanders.`,
    `- Lacerations and amputations from blades and bits
- Guards removed or bypassed
- Kickback and flying debris
- Electrical shock from damaged cords`,
    `1. Are the right tools and guards in place for today's cuts?
2. Did we inspect tools, cords, and blades?
3. How are we securing the work and staying out of the line of fire?`,
    `- [ ] Right tool with guards in place
- [ ] Tool, cord, and blade inspected
- [ ] Workpiece secured; line of fire clear
- [ ] Power disconnected for blade/bit changes`
  ),

  "tbt-22-hand-tool-safety": talk(
    "Hand Tool Safety",
    `- The right tool used the right way prevents most hand-tool injuries — don't improvise.
- Inspect tools for cracked handles, mushroomed heads, and dull edges; tag out and replace damaged tools.
- Cut away from your body, keep blades sharp (dull blades slip), and retract utility knife blades when done.
- Carry tools safely, use a tool bag or lanyard at heights, and don't carry sharp tools in pockets.
- Keep work areas clear so you have room to work.`,
    `- Cuts from knives and sharp edges
- Struck injuries from hammers and chisels
- Flying fragments from mushroomed tool heads
- Dropped tools at heights`,
    `1. Are our hand tools in good shape, or is anything damaged?
2. Are we cutting away from the body and using sharp blades?
3. How are we securing tools when working up high?`,
    `- [ ] Tools inspected; damaged ones removed
- [ ] Correct tool for the task
- [ ] Cutting away from body; blades retracted when idle
- [ ] Tools secured at heights`
  ),

  "tbt-23-machine-guarding-awareness": talk(
    "Machine Guarding Awareness",
    `- Guards protect you from blades, gears, belts, and pinch points — they only work when they're in place.
- Never remove, bypass, or reach around a guard while equipment is running.
- Keep loose clothing, jewelry, gloves, and long hair away from rotating parts.
- If a guard is missing or damaged, tag out the equipment and report it — don't run it.
- Power down and lock out before clearing jams or doing maintenance.`,
    `- Amputations and entanglement in moving parts
- Reaching past a guard into the point of operation
- Loose clothing or gloves caught in rotating parts
- Running equipment with a missing guard`,
    `1. Are all guards in place on the equipment we'll use?
2. What are the pinch and rotating-part hazards?
3. How do we clear a jam safely?`,
    `- [ ] Guards in place and functional
- [ ] No loose clothing/jewelry near moving parts
- [ ] LOTO before clearing jams or service
- [ ] Missing guards tagged out and reported`
  ),

  "tbt-24-excavation-awareness": talk(
    "Excavation Awareness",
    `- Never enter an unprotected trench or excavation — soil can collapse without warning and a cubic yard weighs as much as a car.
- A competent person must inspect excavations daily and after rain or changes, and select protective systems (sloping, shoring, or shielding).
- Locate underground utilities before digging (call 811 / your locate service).
- Keep spoil piles and equipment back from the edge, and keep safe access/egress within reach.
- Watch for water accumulation and atmospheric hazards in deeper excavations.`,
    `- Trench collapse and burial
- Striking underground utilities
- Falls into the excavation; equipment too close to the edge
- Hazardous or low-oxygen atmospheres`,
    `1. Have utilities been located and is the protective system in place?
2. Has the competent person inspected the excavation today?
3. Are spoil piles and equipment set back from the edge?`,
    `- [ ] Utilities located before digging
- [ ] Competent-person inspection done
- [ ] Protective system (slope/shore/shield) in place
- [ ] Spoil and equipment back from the edge; safe access`
  ),

  "tbt-25-trenching-hazards": talk(
    "Trenching Hazards",
    `- Trenching is one of the most dangerous jobs in construction — cave-ins are usually fatal and happen fast.
- Trenches generally need a protective system at depth; the competent person decides the method based on soil and conditions.
- Get out and stay out if you see cracking, bulging, sloughing, or water entering — and before re-entry it must be re-inspected.
- Keep a safe means of exit (ladder/ramp) close to workers in the trench.
- Don't work under suspended loads or near operating equipment at the edge.`,
    `- Cave-in and burial
- No safe exit within reach
- Water intrusion and unstable soil
- Loads and equipment at the trench edge`,
    `1. What protective system are we using and who inspected it?
2. Is there a ladder or ramp within the required distance?
3. What are the warning signs that we get out immediately?`,
    `- [ ] Protective system appropriate for soil/depth
- [ ] Safe exit within reach of workers
- [ ] Daily/after-change inspection by competent person
- [ ] Edges kept clear of loads and equipment`
  ),

  "tbt-26-confined-space-awareness": talk(
    "Confined Space Awareness",
    `- A confined space is big enough to enter, has limited entry/exit, and isn't designed for continuous work — tanks, vaults, pits, and some crawlspaces.
- A permit-required confined space adds a serious hazard (bad atmosphere, engulfment, entrapment) — never enter one without following the permit program.
- Atmosphere must be tested before and during entry; many fatalities are would-be rescuers — don't rush in.
- Know the roles: entrant, attendant, and entry supervisor, plus rescue arrangements.
- If you're not trained and authorized for the specific space, stay out and get the right people.`,
    `- Oxygen-deficient or toxic/flammable atmospheres
- Engulfment and entrapment
- Untrained rescuers becoming victims
- Entry without testing or a permit`,
    `1. Are there any confined spaces in today's work, and are they permit-required?
2. Has the atmosphere been tested and who is the attendant?
3. What's the rescue plan if something goes wrong?`,
    `- [ ] Confined spaces identified and classified
- [ ] Atmosphere tested before/during entry
- [ ] Trained entrant, attendant, supervisor assigned
- [ ] Rescue plan in place; no unplanned rescues`
  ),

  "tbt-27-fire-prevention": talk(
    "Fire Prevention",
    `- Fires need fuel, heat, and oxygen — good housekeeping and chemical control remove the fuel.
- Keep combustibles away from heat sources, hot work, and electrical equipment; store flammables in approved containers/cabinets.
- Keep fire extinguishers accessible, inspected, and matched to the hazard, and keep exits clear.
- Know the location of extinguishers and how to use them (PASS: Pull, Aim, Squeeze, Sweep) — only fight small fires.
- Report damaged wiring, fuel leaks, and blocked exits.`,
    `- Ignition of combustibles near heat or hot work
- Flammable liquids stored or used improperly
- Blocked exits and missing/empty extinguishers
- Electrical faults and overloaded circuits`,
    `1. Where are the fuel sources and ignition risks today?
2. Are extinguishers accessible, charged, and the right type?
3. Are exits and egress paths clear?`,
    `- [ ] Combustibles controlled and separated from heat
- [ ] Flammables in approved storage
- [ ] Extinguishers accessible and inspected
- [ ] Exits clear; crew knows PASS`
  ),

  "tbt-28-hot-work-safety": talk(
    "Hot Work Safety",
    `- Welding, cutting, and grinding throw sparks and slag that can start fires hours later — treat hot work seriously.
- Use a hot work permit where required; clear or cover combustibles within the spark zone and have an extinguisher ready.
- Post a fire watch during the work and for at least the required time afterward, then a final check.
- Protect against fumes with ventilation, and use the right eye/face and skin protection.
- Check for flammable atmospheres before cutting on tanks, drums, or pipes — never assume "empty."`,
    `- Fires and explosions from sparks and slag
- Smoldering ignition discovered after work ends
- Toxic welding fumes
- Burns and arc-eye`,
    `1. Do we need a hot work permit, and is the area cleared of combustibles?
2. Who is the fire watch and for how long after we finish?
3. Could there be flammable vapors in what we're cutting?`,
    `- [ ] Hot work permit completed where required
- [ ] Combustibles removed/covered; extinguisher ready
- [ ] Fire watch posted during and after
- [ ] Ventilation and proper PPE in use`
  ),

  "tbt-29-compressed-gas-cylinder-safety": talk(
    "Compressed Gas Cylinder Safety",
    `- Compressed cylinders store a lot of energy — a knocked-off valve can turn a cylinder into a rocket.
- Secure cylinders upright with a chain or strap, valve caps on when not in use and during transport.
- Keep oxygen and fuel gases separated in storage by distance or a barrier, and away from heat.
- Inspect hoses, regulators, and fittings; never use oil/grease on oxygen fittings.
- Open valves slowly and stand to the side; close valves and bleed lines when done.`,
    `- Cylinder falling and breaking the valve
- Fire/explosion from oxygen and fuel gas mixing
- Leaks at hoses, regulators, and fittings
- Cylinders exposed to heat`,
    `1. Are cylinders secured upright with caps on when not in use?
2. Are oxygen and fuel gases stored properly apart?
3. Did we leak-check hoses and regulators?`,
    `- [ ] Cylinders secured upright; caps on
- [ ] Oxygen/fuel gases separated in storage
- [ ] Hoses/regulators inspected, no oil on oxygen
- [ ] Valves opened slowly; lines bled when done`
  ),

  "tbt-30-housekeeping": talk(
    "Housekeeping",
    `- Good housekeeping prevents more injuries than almost anything else — most slips, trips, and many fires trace back to clutter.
- Keep walkways, stairs, and exits clear; stack and store material so it won't fall or block egress.
- Clean up debris and spills as you go, not at the end of the day.
- Manage cords and hoses so they aren't trip hazards, and keep tools off the floor and walking paths.
- Put scrap and waste in the right containers and keep flammable waste controlled.`,
    `- Slips, trips, and falls from clutter and spills
- Falling material from poor stacking
- Fires from accumulated combustible debris
- Blocked exits and access`,
    `1. Where is clutter or debris building up right now?
2. Are walkways, stairs, and exits clear?
3. How are we cleaning up as we work, not just at quitting time?`,
    `- [ ] Walkways, stairs, exits clear
- [ ] Material stacked safely
- [ ] Debris and spills cleaned as we go
- [ ] Cords/hoses managed; waste in proper containers`
  ),

  "tbt-31-slips-trips-and-falls": talk(
    "Slips, Trips, and Falls",
    `- Same-level falls send a lot of workers to the clinic — and they're almost all preventable.
- Watch for wet, muddy, icy, or oily surfaces; clean spills and use traction where needed.
- Keep walkways clear of cords, hoses, debris, and material, and provide lighting in work and travel paths.
- Use designated walkways and handrails on stairs; don't carry loads that block your view.
- Wear appropriate footwear and slow down — rushing causes falls.`,
    `- Slips on wet, icy, or oily surfaces
- Trips over cords, debris, and uneven ground
- Falls on stairs and from carrying loads blind
- Poor lighting hiding hazards`,
    `1. Where are the slip and trip hazards on our path today?
2. Are walkways clear and well lit?
3. Is anyone carrying loads that block their view?`,
    `- [ ] Spills and slick areas addressed
- [ ] Walkways clear of trip hazards
- [ ] Adequate lighting
- [ ] Proper footwear; handrails used`
  ),

  "tbt-32-material-handling": talk(
    "Material Handling",
    `- Plan the lift before you make it — know the weight, the path, and where it's going.
- Use mechanical help (carts, dollies, hoists, forklifts) for heavy or awkward loads instead of muscling them.
- Lift with your legs, keep the load close, don't twist, and get help or split the load when it's too heavy.
- Keep the travel path clear and watch your fingers and toes at set-down.
- Stack and secure material so it won't shift or fall.`,
    `- Back and shoulder strains from manual lifting
- Crushed fingers and toes at pickup/set-down
- Struck-by from shifting or falling material
- Awkward loads blocking vision`,
    `1. What are we lifting, how heavy, and can we use equipment?
2. Is the path clear and where does it set down?
3. Who needs help on the heavy or awkward loads?`,
    `- [ ] Load weight and path planned
- [ ] Mechanical aids used where possible
- [ ] Proper lifting technique; team lifts as needed
- [ ] Material stacked and secured`
  ),

  "tbt-33-back-injury-prevention": talk(
    "Back Injury Prevention",
    `- Back injuries are often the result of many small strains adding up — protect your back every lift, not just the heavy ones.
- Warm up, then lift with your legs, keep the load close, and avoid twisting — turn your feet instead.
- Reduce how far and how often you carry; raise work to waist height when you can.
- Use carts and team lifts; push rather than pull when moving loads.
- Speak up early about soreness before it becomes an injury.`,
    `- Strains and sprains from lifting and twisting
- Cumulative injury from repetitive handling
- Awkward postures and overreaching
- Ignoring early soreness`,
    `1. Which tasks today put the most strain on backs?
2. Can we raise the work or use equipment to reduce bending?
3. Is anyone already feeling soreness we should plan around?`,
    `- [ ] Heavy/awkward lifts use aids or teams
- [ ] Lift with legs, load close, no twisting
- [ ] Work raised to reduce bending where possible
- [ ] Early soreness reported`
  ),

  "tbt-34-forklift-awareness": talk(
    "Forklift Awareness",
    `- Only trained and authorized operators run forklifts and powered industrial trucks.
- Operators do a pre-use inspection, wear the seatbelt, and keep loads low and tilted back while traveling.
- Pedestrians keep clear, make eye contact with the operator, and never walk or stand under raised forks.
- Watch speed, blind corners, ramps, and load capacity; sound the horn at intersections.
- Lower forks, set the brake, and remove the key when leaving the truck.`,
    `- Pedestrians struck or pinned by forklifts
- Tip-overs from speed, turns, or overloading
- Loads falling from raised forks
- Untrained operators`,
    `1. Are operators trained, and are pedestrians kept clear?
2. Was the forklift inspected and is the load within capacity?
3. Where are the blind spots and pinch points in our area?`,
    `- [ ] Trained/authorized operators only
- [ ] Pre-use inspection done; seatbelt worn
- [ ] Pedestrians clear; no one under raised forks
- [ ] Load within capacity; safe speed`
  ),

  "tbt-35-spotter-safety": talk(
    "Spotter Safety",
    `- A spotter is the operator's eyes where they can't see — use one for backing, tight spaces, and near people or power lines.
- Agree on clear hand signals before moving, and use only one designated spotter at a time.
- The spotter stays in the operator's view, never in the path or pinch points, and stops the move if they lose sight of each other.
- Keep a safe distance from the equipment and from overhead lines.
- If communication breaks, the equipment stops until it's re-established.`,
    `- Spotter struck or crushed by the equipment
- Confusing or conflicting signals
- Spotter in a blind spot or pinch point
- Contact with overhead lines`,
    `1. Do we need a spotter for today's moves, and who is it?
2. What hand signals are we using and is the stop signal clear?
3. How does the spotter stay visible and out of the path?`,
    `- [ ] Spotter assigned for blind/tight moves
- [ ] Agreed signals, including stop
- [ ] Spotter stays visible, out of path/pinch points
- [ ] Move stops if contact is lost`
  ),

  "tbt-36-vehicle-backing-safety": talk(
    "Vehicle Backing Safety",
    `- Backing causes a large share of vehicle incidents — avoid backing when you can by parking to pull forward.
- Do a walk-around before backing to check for people, obstacles, and overhead/underground hazards.
- Use a spotter for limited-visibility backing, and back slowly using mirrors and cameras.
- Sound the horn before moving and keep checking your surroundings.
- Set the brake and chock when parked on a grade.`,
    `- Striking pedestrians or coworkers while backing
- Hitting fixed objects, equipment, or structures
- Blind spots behind the vehicle
- Rolling on a grade`,
    `1. Can we set up to pull through instead of backing?
2. Did we do a walk-around and do we need a spotter?
3. What are the blind spots on our vehicles?`,
    `- [ ] Pull-through parking where possible
- [ ] Walk-around before backing
- [ ] Spotter for limited visibility
- [ ] Back slowly; horn and mirrors used`
  ),

  "tbt-37-distracted-driving": talk(
    "Distracted Driving",
    `- Driving is one of the most dangerous things we do for work — give it your full attention.
- No texting or handheld phone use; pull over to make calls or use the GPS.
- Set up navigation, climate, and music before you drive, not while moving.
- Don't eat, deal with paperwork, or look for tools while driving.
- Stay rested; fatigue is a distraction too. Wear your seatbelt every trip.`,
    `- Crashes from phone use and texting
- Eyes-off-road for navigation, food, or paperwork
- Fatigue slowing reaction time
- Not wearing a seatbelt`,
    `1. What pulls our attention off the road most often?
2. What's our rule for phone use while driving?
3. How do we set up navigation before moving?`,
    `- [ ] Phone put away / hands-free only
- [ ] Navigation set before driving
- [ ] No eating/paperwork while driving
- [ ] Rested; seatbelt on`
  ),

  "tbt-38-job-hazard-analysis": talk(
    "Job Hazard Analysis",
    `- A JHA is a quick, practical way to think through a task before we start: steps, hazards, controls.
- Break the job into steps, ask "what could go wrong" at each, then decide how to control it.
- Use the hierarchy of controls — eliminate or substitute first, then engineering, then safe practices, then PPE.
- Do it with the crew that's doing the work; they know the real hazards.
- Revisit it if the task, crew, or conditions change.`,
    `- Jumping into a task without spotting hazards
- Relying only on PPE instead of better controls
- Changes mid-task that introduce new hazards
- One person planning for everyone`,
    `1. What are the main steps of today's task?
2. What's the worst hazard in each step and how do we control it?
3. What would make us stop and redo the JHA?`,
    `- [ ] Task broken into steps
- [ ] Hazards identified per step
- [ ] Controls chosen using the hierarchy
- [ ] Crew reviewed and signed on`
  ),

  "tbt-39-stop-work-authority": talk(
    "Stop Work Authority",
    `- Everyone here has the authority and the responsibility to stop work that looks unsafe — no exceptions, no retaliation.
- Stopping work isn't overreacting; it's how we catch problems before someone gets hurt.
- When you stop work: pause, make the area safe, tell your supervisor, and we fix it together before restarting.
- "I'm not sure" is a good enough reason to pause and ask.
- We thank people for using it — it protects the whole crew.`,
    `- Pressure to keep working through an unsafe condition
- Hesitating to speak up
- Small issues becoming incidents
- Restarting before the hazard is fixed`,
    `1. Has anyone ever wanted to stop work but hesitated? Why?
2. What's our process once work is stopped?
3. How do we make sure nobody gets grief for using it?`,
    `- [ ] Everyone knows they can stop work
- [ ] Process understood: pause, secure, report, fix
- [ ] No retaliation for stopping
- [ ] Hazard fixed before restart`
  ),

  "tbt-40-near-miss-reporting": talk(
    "Near Miss Reporting",
    `- A near miss is a free warning — someone almost got hurt, and reporting it lets us fix the cause first.
- Report the close calls, not just injuries: the dropped tool that missed, the trip that didn't fall, the spark that didn't catch.
- Reporting is about fixing conditions, not blame — we don't discipline people for reporting.
- Quick, simple reporting works best; tell a supervisor or use the near-miss form.
- We close the loop by fixing the hazard and sharing the lesson.`,
    `- Repeating a hazard because the warning was ignored
- Fear of blame keeping reports quiet
- No follow-up after a report
- Treating near misses as "no big deal"`,
    `1. What near misses have we had lately that we didn't report?
2. What gets in the way of reporting them?
3. How do we make sure reports lead to a fix?`,
    `- [ ] Crew knows what a near miss is
- [ ] Simple way to report available
- [ ] No-blame reporting culture
- [ ] Reports lead to corrective action`
  ),

  "tbt-41-incident-reporting": talk(
    "Incident Reporting",
    `- Report every injury, illness, and significant incident to your supervisor as soon as it's safe — even the "minor" ones.
- Early reporting gets people proper care and protects their claim, and lets us fix the cause.
- Don't move or change the scene more than needed for safety until it's documented.
- Give the facts: what happened, when, where, who, and conditions — not guesses about blame.
- Cooperate with the investigation; the goal is preventing the next one.`,
    `- Untreated injuries getting worse
- Lost facts from late reporting
- Repeat incidents because the cause wasn't fixed
- Scene changed before documentation`,
    `1. Who do we report an incident to, and how fast?
2. Why does reporting a "minor" injury still matter?
3. What information do we need to capture?`,
    `- [ ] Crew knows how and when to report
- [ ] Even minor injuries reported
- [ ] Scene preserved as safe to do so
- [ ] Facts documented; investigation supported`
  ),

  "tbt-42-emergency-action-plans": talk(
    "Emergency Action Plans",
    `- Before an emergency happens, everyone should know what to do — that's the point of the Emergency Action Plan.
- Know the alarm/notification method, evacuation routes, and the muster point for this site.
- Know how to call for help, the site address to give 911, and where the first aid and extinguishers are.
- Account for everyone at the muster point; report anyone missing to emergency responders, don't go back in.
- Review the plan when you start a new site.`,
    `- Confusion and delay during an emergency
- Not knowing the site address to give 911
- Blocked exits or unknown muster point
- Going back into danger for missing coworkers`,
    `1. What's our muster point and evacuation route here?
2. What address do we give 911 for this site?
3. How do we account for everyone after evacuating?`,
    `- [ ] Evacuation routes and muster point known
- [ ] Site address posted for 911
- [ ] First aid/extinguisher locations known
- [ ] Head-count process understood`
  ),

  "tbt-43-first-aid-awareness": talk(
    "First Aid Awareness",
    `- Know where the first aid kit is and who on the crew is trained before you need them.
- For anything serious — chest pain, heavy bleeding, head injury, unconsciousness — call 911 first.
- Control bleeding with direct pressure; don't move someone with a possible spine injury unless they're in danger.
- Protect yourself from blood/body fluids (gloves, barrier) and wash up after.
- Restock the kit after use and report what was used.`,
    `- Delayed care for serious injuries
- Untrained responders making things worse
- Exposure to blood and body fluids
- Empty or missing first aid supplies`,
    `1. Where's the first aid kit and who is trained?
2. What injuries mean "call 911 now"?
3. How do we protect ourselves when helping someone bleeding?`,
    `- [ ] First aid kit location and contents known
- [ ] Trained responders identified
- [ ] 911 criteria understood
- [ ] Barrier protection available; kit restocked`
  ),

  "tbt-44-bloodborne-pathogens-awareness": talk(
    "Bloodborne Pathogens Awareness",
    `- Blood and certain body fluids can carry infections — treat all blood as potentially infectious.
- Wear gloves and use a barrier when helping with a bleeding injury; avoid contact with your eyes, nose, and mouth.
- Clean and disinfect contaminated surfaces, and dispose of contaminated materials properly.
- Wash hands thoroughly after any contact, even if you wore gloves.
- Report any exposure (needle stick, splash to eyes/mouth, contact with broken skin) right away.`,
    `- Exposure to bloodborne infections
- Contact through cuts, eyes, nose, or mouth
- Improper cleanup of blood/fluids
- Unreported exposures`,
    `1. When could we come into contact with blood on this job?
2. What protection do we use when helping someone hurt?
3. What do we do if we have an exposure?`,
    `- [ ] Treat all blood as infectious
- [ ] Gloves/barriers available for first aid
- [ ] Proper cleanup and disposal
- [ ] Exposures reported immediately`
  ),

  "tbt-45-silica-dust-awareness": talk(
    "Silica Dust Awareness",
    `- Cutting, grinding, drilling, or breaking concrete, masonry, and stone releases respirable silica dust that scars the lungs over time.
- Control the dust at the source: use water (wet cutting) or tool-mounted dust collection (vacuum with the right filter).
- Where required, use respiratory protection as part of the program — after controls, not instead of them.
- Keep others out of the dust zone and don't dry-sweep silica dust; use water or a vacuum.
- Follow your written exposure control plan for the task.`,
    `- Lung disease (silicosis) and other illness from respirable silica
- Dry cutting/grinding without dust control
- Bystanders exposed to drifting dust
- Dry sweeping stirring dust back up`,
    `1. Which of today's tasks create silica dust?
2. Are we using water or vacuum dust collection?
3. Who needs to stay clear of the dust zone?`,
    `- [ ] Silica tasks identified
- [ ] Water or vacuum dust controls in use
- [ ] Respirator per the control plan where required
- [ ] No dry sweeping; bystanders kept clear`
  ),

  "tbt-46-asbestos-awareness": talk(
    "Asbestos Awareness",
    `- Older buildings may contain asbestos in materials like floor tile, mastic, insulation, joint compound, and siding — you can't tell by looking.
- If you might disturb a suspect material, stop and report it; don't cut, drill, or break it.
- Only trained, licensed personnel handle asbestos work — that is not general crew work.
- Disturbing asbestos releases fibers that cause serious lung disease years later.
- When in doubt, treat it as if it contains asbestos until it's been assessed.`,
    `- Releasing asbestos fibers by disturbing suspect materials
- Long-term lung disease and cancer
- Assuming a material is safe without testing
- Untrained workers handling regulated material`,
    `1. Could there be suspect materials where we're working today?
2. What do we do if we find or disturb one?
3. Who is qualified to handle it — and it isn't us, right?`,
    `- [ ] Suspect materials identified before disturbing
- [ ] Stop-work and report if found
- [ ] No cutting/drilling of suspect material
- [ ] Licensed professionals handle asbestos`
  ),

  "tbt-47-lead-awareness": talk(
    "Lead Awareness",
    `- Lead-based paint is common in buildings built before 1978; sanding, scraping, cutting, or demolition can release lead dust and fumes.
- Lead harms the nervous system and organs and can be carried home to your family on clothes and skin.
- Use lead-safe work practices: contain the area, control dust, and use the right PPE and respiratory protection per the program.
- Don't eat, drink, or smoke in the work area; wash hands and face before breaks and change out of work clothes.
- Only trained workers do lead-disturbing work.`,
    `- Lead poisoning from dust and fumes
- Take-home lead exposure to families
- Dry sanding/scraping without containment
- Eating or smoking with lead on hands`,
    `1. Could we disturb lead paint on this job?
2. What controls and PPE do we use if so?
3. How do we avoid taking lead home?`,
    `- [ ] Lead-disturbing tasks identified
- [ ] Containment and dust controls in place
- [ ] Proper PPE/respirator per program
- [ ] Wash up; no eating/smoking in the area`
  ),

  "tbt-48-working-around-heavy-equipment": talk(
    "Working Around Heavy Equipment",
    `- Stay out of the swing radius and blind spots of excavators, loaders, and dozers — operators often can't see you.
- Make eye contact with the operator and get a clear acknowledgment before approaching.
- Wear high-visibility clothing and use spotters and signals near operating equipment.
- Never walk or stand under a raised bucket or load, and keep clear of pinch points between equipment and structures.
- Watch for traffic patterns and keep a safe separation between equipment and people on foot.`,
    `- Workers on foot struck or crushed by equipment
- Caught in the swing radius or pinch points
- Operator blind spots
- Loads handled overhead of workers`,
    `1. Where are the equipment blind spots and swing radius today?
2. How do we make contact with operators before approaching?
3. How are we separating people on foot from equipment?`,
    `- [ ] High-visibility clothing worn
- [ ] Eye contact/acknowledgment before approaching
- [ ] Clear of swing radius and pinch points
- [ ] No one under raised loads`
  ),

  "tbt-49-noise-hazards": talk(
    "Noise Hazards",
    `- Loud jobsite noise damages hearing permanently and also masks warnings like backup alarms and shouts.
- Use hearing protection where it's loud, and reduce noise at the source where you can (mufflers, barriers, quieter methods).
- Position loud equipment away from where people work, and rotate workers to limit exposure.
- Stay alert to alarms and equipment movement even with protection in.
- Hearing loss is gradual — protect it every day, not just on the loudest days.`,
    `- Permanent hearing loss from cumulative exposure
- Missing audible warnings in high noise
- Loud tools positioned near work crews
- Skipping protection on "average" days`,
    `1. What's loud enough to need protection on this job?
2. Can we lower the noise at the source or with distance?
3. How do we stay aware of alarms with protection in?`,
    `- [ ] Hearing protection used in noisy areas
- [ ] Noise reduced at source/distance where possible
- [ ] Exposure time managed
- [ ] Crew stays alert to alarms`
  ),

  "tbt-50-weather-hazards": talk(
    "Weather Hazards",
    `- Weather changes the job — wind, lightning, rain, heat, cold, and ice all add hazards.
- Stop outdoor and elevated work and seek shelter when lightning is near (when thunder roars, go indoors), and wait the recommended time before returning.
- High winds make working at heights, with materials, and with cranes/lifts dangerous — adjust or stop the work.
- Rain and ice create slips and reduce visibility; muddy ground reduces equipment stability.
- Check the forecast and have a plan to adjust the day's work.`,
    `- Lightning strike during outdoor/elevated work
- Wind affecting heights, materials, and lifts
- Slips and reduced traction in rain/ice
- Unstable ground for equipment`,
    `1. What's the forecast and what could force us to adjust?
2. What's our plan and shelter if lightning moves in?
3. Does wind affect any lifts or work at height today?`,
    `- [ ] Forecast checked; plan to adjust
- [ ] Lightning plan and shelter known
- [ ] Wind limits respected for heights/lifts
- [ ] Slip/traction and ground stability addressed`
  ),

  "tbt-51-jobsite-communication": talk(
    "Jobsite Communication",
    `- Most incidents involve a communication gap — clear, simple communication keeps everyone safe.
- Hold a short pre-task talk so everyone knows the plan, the hazards, and who's doing what.
- Agree on signals and radio channels, and confirm you were understood — don't assume.
- Speak up about hazards and changes immediately; coordinate with other trades sharing the area.
- Account for language differences and noise; use signals and visuals when needed.`,
    `- Misunderstandings leading to incidents
- Trades working over or into each other
- Signals or radio calls not confirmed
- Language and noise barriers`,
    `1. Who needs to coordinate with us in this area today?
2. What signals or channels are we using?
3. How do we confirm a message was understood?`,
    `- [ ] Pre-task talk held
- [ ] Signals/radio channels agreed
- [ ] Coordination with other trades
- [ ] Messages confirmed, not assumed`
  ),

  "tbt-52-end-of-year-safety-review": talk(
    "End-of-Year Safety Review",
    `- Take a few minutes to look back: what went well, what close calls did we have, and what do we want to improve.
- Review the incidents and near misses from the year and the lessons we took from them.
- Recognize good catches and safe work — reinforce what we want more of.
- Look ahead: training due, seasonal hazards, and goals for next year.
- Ask the crew what would make the work safer — they see it every day.`,
    `- Repeating last year's incidents without learning
- Missing training renewals into the new year
- Losing momentum on safety improvements
- Not capturing the crew's input`,
    `1. What were our biggest safety wins and close calls this year?
2. What's one thing that would make next year safer?
3. What training or renewals are coming due?`,
    `- [ ] Year's incidents/near misses reviewed
- [ ] Good catches recognized
- [ ] Upcoming training identified
- [ ] Crew input captured for next year`
  ),
};
