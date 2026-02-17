import { DialogueTree, DialogueNode } from '@/types/dialogue';

// Lisa's dialogue tree
const lisaDialogue: DialogueTree = {
  npcId: 'lisa',
  nodes: [
    {
      id: 'lisa-entry', npcId: 'lisa', isEntry: true,
      text: 'Hi... are you looking into what happened to Noor? I\'m so worried about her.',
      choices: [
        { id: 'lisa-c1', text: 'Yes, I\'m trying to find out what happened. Can you tell me about her?', nextNodeId: 'lisa-about', trustChange: 5 },
        { id: 'lisa-c2', text: 'When did you last see Noor?', nextNodeId: 'lisa-lastseen' },
      ],
    },
    {
      id: 'lisa-about', npcId: 'lisa',
      text: 'Noor is... she\'s the most genuine person I know. She moved here three years ago and it felt like she\'d always been here. We\'d have coffee every morning. She\'d show me her paintings, I\'d bring her bread.',
      choices: [
        { id: 'lisa-c3', text: 'What about her ex, Thomas?', nextNodeId: 'lisa-thomas' },
        { id: 'lisa-c4', text: 'Was she worried about anything recently?', nextNodeId: 'lisa-worried' },
      ],
    },
    {
      id: 'lisa-lastseen', npcId: 'lisa',
      text: 'We had coffee that morning. She seemed distracted, kept checking her phone. Said she had "something to finish at the studio." That was the last time.',
      choices: [
        { id: 'lisa-c5', text: 'Was she meeting someone?', nextNodeId: 'lisa-meeting' },
        { id: 'lisa-c6', text: 'Tell me about Thomas.', nextNodeId: 'lisa-thomas' },
      ],
    },
    {
      id: 'lisa-thomas', npcId: 'lisa', requiresTrust: 20,
      text: 'Thomas... look, I tried to like him for Noor\'s sake. But he was controlling. Checked her phone, showed up places uninvited, questioned who she was seeing. The breakup was four months ago and he wouldn\'t let go.',
      choices: [
        { id: 'lisa-c7', text: 'Did Noor ever say she was scared of him?', nextNodeId: 'lisa-scared', requiresTrust: 35, collectEvidence: 'lisa_testimony' },
        { id: 'lisa-c8', text: 'Do you think Thomas could have done something?', nextNodeId: 'lisa-suspect' },
      ],
    },
    {
      id: 'lisa-scared', npcId: 'lisa',
      text: 'Yes. She told me he "wouldn\'t stop." New accounts following her, showing up at the studio, knowing things he shouldn\'t know. I told her to go to the police. She said... she said they wouldn\'t take it seriously. She was right.',
      choices: [
        { id: 'lisa-c9', text: 'What about the black square on her account?', nextNodeId: 'lisa-blacksquare', setFlag: 'lisa_revealed_stalking' },
        { id: 'lisa-c10', text: 'Thank you for telling me this. I\'ll look into Thomas.', nextNodeId: null, trustChange: 10 },
      ],
    },
    {
      id: 'lisa-suspect', npcId: 'lisa',
      text: 'I... I don\'t want to accuse anyone without evidence. But something is very wrong. The black square — that wasn\'t Noor. She would never post something meaningless. Someone had access to her account.',
      choices: [
        { id: 'lisa-c11', text: 'I\'ll find the evidence. Thank you, Lisa.', nextNodeId: null, trustChange: 5 },
      ],
    },
    {
      id: 'lisa-meeting', npcId: 'lisa',
      text: 'I think she was meeting the journalist, Pim. They\'d been talking a lot lately. She said it was "for a project." Very secretive about it.',
      choices: [
        { id: 'lisa-c12', text: 'What project?', nextNodeId: 'lisa-project', requiresTrust: 30 },
        { id: 'lisa-c13', text: 'Interesting. I\'ll talk to Pim.', nextNodeId: null },
      ],
    },
    {
      id: 'lisa-project', npcId: 'lisa',
      text: 'She wouldn\'t say much. Just that she\'d "found something important" and Pim was helping her figure out what to do with it. She looked excited but also scared.',
      choices: [
        { id: 'lisa-c14', text: 'Thank you. This is really helpful.', nextNodeId: null, trustChange: 5, setFlag: 'lisa_mentioned_project' },
      ],
    },
    {
      id: 'lisa-worried', npcId: 'lisa',
      text: 'The last few weeks she was different. Jumpy. Kept looking over her shoulder. She said someone was watching her but she couldn\'t prove it. I should have done more.',
      choices: [
        { id: 'lisa-c15', text: 'It\'s not your fault. Tell me about Thomas.', nextNodeId: 'lisa-thomas' },
        { id: 'lisa-c16', text: 'Was she meeting Pim Veldkamp?', nextNodeId: 'lisa-meeting' },
      ],
    },
    {
      id: 'lisa-blacksquare', npcId: 'lisa',
      text: 'Three days after she vanished. A black square. No words, no art, no meaning. That\'s not Noor. Someone posted that. Someone with her phone or her password. And I think we both know who.',
      choices: [
        { id: 'lisa-c17', text: 'Thomas.', nextNodeId: null, trustChange: 10, setFlag: 'lisa_confirmed_thomas' },
      ],
    },
  ],
};

// David's dialogue tree
const davidDialogue: DialogueTree = {
  npcId: 'david',
  nodes: [
    {
      id: 'david-entry', npcId: 'david', isEntry: true,
      text: 'I keep replaying that night in my head. I should have gone outside when I heard the shouting.',
      choices: [
        { id: 'david-c1', text: 'What did you hear exactly?', nextNodeId: 'david-heard', collectEvidence: 'shouting_art_centre' },
        { id: 'david-c2', text: 'Tell me about Noor\'s studio.', nextNodeId: 'david-studio' },
      ],
    },
    {
      id: 'david-heard', npcId: 'david',
      text: 'Around half ten. A man\'s voice, shouting. Angry. Then a woman \u2014 not shouting back, more like... distressed. Crying. It came from Noor\'s side of the building. By the time I looked out, I just heard a door slam and running.',
      choices: [
        { id: 'david-c3', text: 'Did you see who it was?', nextNodeId: 'david-didntsee' },
        { id: 'david-c4', text: 'Can I see Noor\'s studio?', nextNodeId: 'david-studiokey', requiresTrust: 50 },
      ],
    },
    {
      id: 'david-didntsee', npcId: 'david',
      text: 'No. By the time I got to the window, just shadows. But I know that voice. I\'ve heard Thomas Groot in the hallway before. The way he\'d come looking for Noor even after they split. It sounded like him.',
      choices: [
        { id: 'david-c5', text: 'Thomas used to come to the art centre?', nextNodeId: 'david-thomasvisits', setFlag: 'witness_david' },
        { id: 'david-c6', text: 'Thank you. This helps.', nextNodeId: null, trustChange: 5 },
      ],
    },
    {
      id: 'david-thomasvisits', npcId: 'david',
      text: 'More than once. He\'d show up unannounced, wait in the car park. Sometimes I\'d see his Golf parked outside after hours. Noor asked me not to say anything. She said she was handling it.',
      choices: [
        { id: 'david-c7', text: 'She wasn\'t handling it.', nextNodeId: null, trustChange: 5 },
      ],
    },
    {
      id: 'david-studio', npcId: 'david',
      text: 'We share the top floor. Her space is incredible \u2014 or was. The "Undercurrent" series, dark blues and greys, the sea at night. And recently, hundreds of tiny ink drawings of eyes. Watching eyes. It was unsettling.',
      choices: [
        { id: 'david-c8', text: 'Eyes? That sounds significant.', nextNodeId: 'david-eyes' },
        { id: 'david-c9', text: 'Could I see the studio?', nextNodeId: 'david-studiokey', requiresTrust: 50 },
      ],
    },
    {
      id: 'david-eyes', npcId: 'david',
      text: 'She was being watched and she knew it. Art was how she processed it. Those eyes... they\'re everywhere in her recent work. On scraps of paper, on the walls, in the margins of her notes.',
      choices: [
        { id: 'david-c10', text: 'I need to see that studio.', nextNodeId: 'david-studiokey', requiresTrust: 50 },
        { id: 'david-c11', text: 'What else can you tell me?', nextNodeId: 'david-heard' },
      ],
    },
    {
      id: 'david-studiokey', npcId: 'david', requiresTrust: 50,
      text: 'I have a spare key. Noor gave it to me in case of emergencies. I think this qualifies. Go. Look at her desk \u2014 there were notes about something. Not art. Some kind of documents. "14b" written everywhere.',
      choices: [
        { id: 'david-c12', text: 'Thank you, David. This could be the breakthrough.', nextNodeId: null, trustChange: 15, setFlag: 'studio_accessed', collectEvidence: 'agenda_14b' },
      ],
    },
  ],
};

// Sophie's dialogue tree
const sophieDialogue: DialogueTree = {
  npcId: 'sophie',
  nodes: [
    {
      id: 'sophie-entry', npcId: 'sophie', isEntry: true,
      text: 'I told the police everything. They didn\'t seem interested. Maybe you\'ll listen better.',
      choices: [
        { id: 'sophie-c1', text: 'I\'m listening. What happened that night?', nextNodeId: 'sophie-night', setFlag: 'witness_sophie' },
        { id: 'sophie-c2', text: 'How well did you know Noor?', nextNodeId: 'sophie-knew' },
      ],
    },
    {
      id: 'sophie-night', npcId: 'sophie',
      text: 'It was about eleven at night. A knock at my door. Noor was standing there \u2014 shaking, crying, no bag, no phone. She said "Sophie, please, I need help. He took my phone." I brought her inside.',
      choices: [
        { id: 'sophie-c3', text: '"He"? Did she say who?', nextNodeId: 'sophie-who' },
        { id: 'sophie-c4', text: 'What happened after you let her in?', nextNodeId: 'sophie-after' },
      ],
    },
    {
      id: 'sophie-who', npcId: 'sophie',
      text: 'She didn\'t say a name. But I know who she meant. That ex-boyfriend of hers. Thomas. He\'d been bothering her for months. I could hear him sometimes, in the stairwell, knocking on her door at odd hours.',
      choices: [
        { id: 'sophie-c5', text: 'Then what happened?', nextNodeId: 'sophie-after' },
      ],
    },
    {
      id: 'sophie-after', npcId: 'sophie', requiresTrust: 30,
      text: 'She called someone from my phone. Said "I need to go now, tonight." About twenty minutes later a car came. A man she seemed to trust. She hugged me, said "thank you" and "I\'m sorry." Then she left.',
      choices: [
        { id: 'sophie-c6', text: 'The car \u2014 could it have been Pim Veldkamp?', nextNodeId: 'sophie-pim', requiresTrust: 45 },
        { id: 'sophie-c7', text: 'She\'s alive. She escaped.', nextNodeId: 'sophie-alive' },
      ],
    },
    {
      id: 'sophie-pim', npcId: 'sophie',
      text: 'I didn\'t see the driver clearly. Dark hatchback. But yes, she\'d mentioned a journalist friend. Pim. Said he was "helping her with something important." I think he\'s the one who came.',
      choices: [
        { id: 'sophie-c8', text: 'Sophie, you may have saved her life.', nextNodeId: null, trustChange: 15, setFlag: 'sophie_confirmed_escape' },
      ],
    },
    {
      id: 'sophie-alive', npcId: 'sophie',
      text: 'I believe so. She was scared but she had a plan. Someone she trusted was coming. That gives me hope. But that man \u2014 Thomas \u2014 he needs to be stopped.',
      choices: [
        { id: 'sophie-c9', text: 'I\'m working on it. Thank you, Sophie.', nextNodeId: null, trustChange: 10 },
      ],
    },
    {
      id: 'sophie-knew', npcId: 'sophie',
      text: 'She lived in the apartment below mine. Always working late, coming home smelling of paint. She\'d bring me her paintings to look at. I\'d bring her cake. She\'s a good girl. A real artist.',
      choices: [
        { id: 'sophie-c10', text: 'What happened the night she disappeared?', nextNodeId: 'sophie-night', setFlag: 'witness_sophie' },
      ],
    },
  ],
};

// Pim's dialogue tree
const pimDialogue: DialogueTree = {
  npcId: 'pim',
  nodes: [
    {
      id: 'pim-entry', npcId: 'pim', isEntry: true,
      text: 'I appreciate the concern but I\'ve directed all inquiries to the police. I can\'t comment on an active situation.',
      choices: [
        { id: 'pim-c1', text: 'I know you\'re protecting her. I\'m trying to help.', nextNodeId: 'pim-protective', requiresTrust: 30 },
        { id: 'pim-c2', text: 'Item 14b. The waterfront deal. What did Noor find?', nextNodeId: 'pim-14b', requiresTrust: 40, requiresFlag: 'studio_accessed' },
      ],
    },
    {
      id: 'pim-protective', npcId: 'pim', requiresTrust: 30,
      text: '...Who told you that? Look, I\'m a journalist. I protect sources. That\'s non-negotiable. If you want to help, find evidence. Don\'t ask me to confirm things.',
      choices: [
        { id: 'pim-c3', text: 'I found Noor\'s studio. I know about the documents.', nextNodeId: 'pim-14b', requiresFlag: 'studio_accessed' },
        { id: 'pim-c4', text: 'I understand. But the police aren\'t investigating properly.', nextNodeId: 'pim-police' },
      ],
    },
    {
      id: 'pim-14b', npcId: 'pim', requiresTrust: 40,
      text: 'Okay. Off the record. Noor found corruption documents in the art centre filing cabinet. The waterfront land deal \u2014 De Vries sold public land to his university friend for €1.2M below market value. She photographed everything and brought it to me.',
      choices: [
        { id: 'pim-c5', text: 'And then Thomas found out she was meeting you secretly.', nextNodeId: 'pim-thomas', setFlag: 'pim_revealed_story' },
        { id: 'pim-c6', text: 'Where is Noor now?', nextNodeId: 'pim-where', requiresTrust: 60 },
      ],
    },
    {
      id: 'pim-thomas', npcId: 'pim',
      text: 'Thomas was tracking her. He saw her late-night posts from "unfamiliar locations" \u2014 that was her coming to meet me. He thought we were... having an affair. That\'s what triggered the confrontation. He had no idea about the corruption.',
      choices: [
        { id: 'pim-c7', text: 'So Noor had two threats: a stalker and a corrupt alderman.', nextNodeId: null, trustChange: 15, setFlag: 'pim_confirmed_dual_threat' },
      ],
    },
    {
      id: 'pim-where', npcId: 'pim', requiresTrust: 60,
      text: 'I can\'t tell you exactly. But she\'s safe. She\'s in a shelter. I picked her up from Sophie\'s that night and drove her out of Zuidhaven. She wanted to stay and fight but it wasn\'t safe. Not with Thomas and not with what she knew about De Vries.',
      choices: [
        { id: 'pim-c8', text: 'We need to make it safe for her to come back.', nextNodeId: null, trustChange: 20, setFlag: 'pim_confirmed_alive' },
      ],
    },
    {
      id: 'pim-police', npcId: 'pim',
      text: 'You noticed that too? Case classified as "voluntary absence" in 24 hours. De Vries sits on the police advisory board. Connect the dots. Van Dijk tried \u2014 he\'s a good officer. But the chief shut him down.',
      choices: [
        { id: 'pim-c9', text: 'I\'ll talk to Van Dijk directly.', nextNodeId: null, trustChange: 5, setFlag: 'pim_mentioned_vandijk' },
      ],
    },
  ],
};

// Van Dijk's dialogue tree
const vandijkDialogue: DialogueTree = {
  npcId: 'vandijk',
  nodes: [
    {
      id: 'vandijk-entry', npcId: 'vandijk', isEntry: true,
      text: 'I can\'t discuss active cases. But between you and me... this one doesn\'t sit right.',
      choices: [
        { id: 'vd-c1', text: 'The case was closed too fast, wasn\'t it?', nextNodeId: 'vandijk-toofast' },
        { id: 'vd-c2', text: 'Thomas Groot came to you. What did he say?', nextNodeId: 'vandijk-thomas', requiresTrust: 30 },
      ],
    },
    {
      id: 'vandijk-toofast', npcId: 'vandijk',
      text: 'Voluntary absence. Classified in 24 hours. In my experience, that\'s not normal for a missing person with no history. Someone wanted this case to go away.',
      choices: [
        { id: 'vd-c3', text: 'De Vries?', nextNodeId: 'vandijk-devries', requiresTrust: 40 },
        { id: 'vd-c4', text: 'What did you find before it was shut down?', nextNodeId: 'vandijk-thomas' },
      ],
    },
    {
      id: 'vandijk-thomas', npcId: 'vandijk', requiresTrust: 30,
      text: 'Thomas Groot showed up unprompted. Said he wanted to "help." But he knew things he shouldn\'t \u2014 where Noor had been, who she\'d met, her schedule for that week. I flagged it as suspicious. My report was... not prioritized.',
      choices: [
        { id: 'vd-c5', text: 'If I bring you evidence of stalking, can you reopen the case?', nextNodeId: 'vandijk-reopen', collectEvidence: 'vandijk_report' },
      ],
    },
    {
      id: 'vandijk-devries', npcId: 'vandijk', requiresTrust: 40,
      text: 'I can\'t name names. But someone on the advisory board suggested the chief that this was "a personal matter, relationship problems." The chief listened. I didn\'t agree but I follow orders.',
      choices: [
        { id: 'vd-c6', text: 'If I bring enough evidence, would you act?', nextNodeId: 'vandijk-reopen' },
      ],
    },
    {
      id: 'vandijk-reopen', npcId: 'vandijk',
      text: 'Bring me something solid. The alt account, witness statements, anything that proves a pattern of stalking. If you give me enough, I can go over the chief\'s head. I became a cop to protect people. Let me do my job.',
      choices: [
        { id: 'vd-c7', text: 'I\'ll get you everything you need.', nextNodeId: null, trustChange: 15, setFlag: 'vandijk_ready_to_act' },
      ],
    },
  ],
};

// Mila's dialogue tree
const milaDialogue: DialogueTree = {
  npcId: 'mila',
  nodes: [
    {
      id: 'mila-entry', npcId: 'mila', isEntry: true,
      text: 'You\'re looking into Noor? Please... please find her. She\'s more than a teacher to me.',
      choices: [
        { id: 'mila-c1', text: 'Noor gave you something to hold onto. What was it?', nextNodeId: 'mila-usb', requiresTrust: 35 },
        { id: 'mila-c2', text: 'What was Noor like as a teacher?', nextNodeId: 'mila-teacher' },
      ],
    },
    {
      id: 'mila-teacher', npcId: 'mila',
      text: 'She taught me to see. Not just look \u2014 see. The way light falls, the stories in faces, the truth in small details. She said art is evidence of being alive.',
      choices: [
        { id: 'mila-c3', text: 'She trusted you. She gave you something important.', nextNodeId: 'mila-usb', requiresTrust: 35 },
        { id: 'mila-c4', text: 'Did she seem different recently?', nextNodeId: 'mila-different' },
      ],
    },
    {
      id: 'mila-different', npcId: 'mila',
      text: 'The last few weeks she was nervous. Checking her phone, looking out the window. She said "trust your instincts, Mila. If something feels wrong, it usually is."',
      choices: [
        { id: 'mila-c5', text: 'She gave you a USB drive. Can you tell me about it?', nextNodeId: 'mila-usb', requiresTrust: 35 },
      ],
    },
    {
      id: 'mila-usb', npcId: 'mila', requiresTrust: 35,
      text: 'She told me: "If anything happens to me, give this to Pim." A USB drive. She was so serious when she said it. I still have it. It\'s safe.',
      choices: [
        { id: 'mila-c6', text: 'Mila, I think it\'s time to give it to Pim. Or to me. This could help bring her home.', nextNodeId: 'mila-handover', requiresTrust: 50 },
        { id: 'mila-c7', text: 'Keep it safe for now. Don\'t tell anyone else.', nextNodeId: null, trustChange: 5 },
      ],
    },
    {
      id: 'mila-handover', npcId: 'mila', requiresTrust: 50,
      text: 'Okay. I trust you. It has photos of documents \u2014 official-looking stuff. Meeting notes, valuations, emails. Noor said it was proof of "something rotten in this town." Take it. Bring her home.',
      choices: [
        { id: 'mila-c8', text: 'Thank you, Mila. You\'re very brave.', nextNodeId: null, trustChange: 20, collectEvidence: 'usb_drive', setFlag: 'has_usb_drive' },
      ],
    },
  ],
};

// Yara's dialogue tree
const yaraDialogue: DialogueTree = {
  npcId: 'yara',
  nodes: [
    {
      id: 'yara-entry', npcId: 'yara', isEntry: true,
      text: 'Please, if you know anything about my sister... I haven\'t slept in days.',
      choices: [
        { id: 'yara-c1', text: 'I\'m investigating. Have you heard from Noor at all?', nextNodeId: 'yara-payphone', requiresTrust: 25 },
        { id: 'yara-c2', text: 'What can you tell me about Thomas?', nextNodeId: 'yara-thomas' },
      ],
    },
    {
      id: 'yara-payphone', npcId: 'yara', requiresTrust: 25,
      text: 'One call. From a payphone. All she said was: "I\'m safe. Don\'t trust anyone in Zuidhaven." Then she hung up. She\'s alive. I know she\'s alive. But someone in that town is dangerous.',
      choices: [
        { id: 'yara-c3', text: 'I think I know who. Thomas.', nextNodeId: 'yara-thomas-confirm', setFlag: 'yara_confirmed_call' },
        { id: 'yara-c4', text: 'Did she say anything else?', nextNodeId: null, trustChange: 5 },
      ],
    },
    {
      id: 'yara-thomas', npcId: 'yara',
      text: 'I HATED him. From the first time I met him. The way he looked at her \u2014 like she was his property. And after the breakup? He didn\'t stop. He\'d message me asking where she was. I blocked him.',
      choices: [
        { id: 'yara-c5', text: 'He messaged you? That\'s part of the pattern.', nextNodeId: null, trustChange: 10, setFlag: 'yara_revealed_messages' },
      ],
    },
    {
      id: 'yara-thomas-confirm', npcId: 'yara',
      text: 'If it\'s Thomas, make him pay. My sister ran because of him. She\'s hiding because of him. Every day she\'s away is because of him. Find the evidence and end this.',
      choices: [
        { id: 'yara-c6', text: 'I will. I promise.', nextNodeId: null, trustChange: 15 },
      ],
    },
  ],
};

// Thomas confrontation dialogue
const thomasDialogue: DialogueTree = {
  npcId: 'thomas',
  nodes: [
    {
      id: 'thomas-entry', npcId: 'thomas', isEntry: true,
      text: 'Look, I\'m just as worried as anyone. Noor and I had our problems but I care about her. What do you want?',
      choices: [
        { id: 'thomas-c1', text: 'Tell me about the night she disappeared.', nextNodeId: 'thomas-night' },
        { id: 'thomas-c2', text: 'I know about @sportief_zh.', nextNodeId: 'thomas-sportief', requiresFlag: 'has_sportief_evidence' },
      ],
    },
    {
      id: 'thomas-night', npcId: 'thomas',
      text: 'I was at the gym until late, then home. I heard about it the next morning. Went straight to the police to help.',
      choices: [
        { id: 'thomas-c3', text: 'That\'s not what witnesses say. You were at the caf\u00e9.', nextNodeId: 'thomas-caught-cafe', requiresFlag: 'witness_bas' },
        { id: 'thomas-c4', text: 'The police found your behaviour suspicious.', nextNodeId: 'thomas-defensive' },
      ],
    },
    {
      id: 'thomas-caught-cafe', npcId: 'thomas',
      text: 'Fine, I was at \'t Morgenrood first. So what? I had a few drinks. That\'s not a crime.',
      choices: [
        { id: 'thomas-c5', text: 'You left angry at 22:00. Your car was at the art centre at 22:15.', nextNodeId: 'thomas-caught-car', requiresFlag: 'witness_jan' },
        { id: 'thomas-c6', text: 'You were seen leaving angry. Why?', nextNodeId: 'thomas-deflect' },
      ],
    },
    {
      id: 'thomas-caught-car', npcId: 'thomas',
      text: 'I... I went to talk to her. That\'s all. We had things to discuss. She wouldn\'t answer my messages.',
      choices: [
        { id: 'thomas-c7', text: 'People heard shouting. A woman crying. You took her phone.', nextNodeId: 'thomas-confronted', requiresFlag: 'witness_david' },
      ],
    },
    {
      id: 'thomas-confronted', npcId: 'thomas', questGate: 4,
      text: '...I just wanted to talk. She was meeting someone, late at night, in secret. I thought... I thought she was seeing someone. I grabbed her phone and she ran. I didn\'t hurt her. I would NEVER hurt her.',
      choices: [
        { id: 'thomas-c8', text: 'You created @sportief_zh to stalk her. You deleted her posts. You posted the black square.', nextNodeId: 'thomas-breakdown', requiresFlag: 'has_sportief_evidence', collectEvidence: 'noor_phone' },
        { id: 'thomas-c9', text: 'She ran because she was terrified of you.', nextNodeId: 'thomas-denial' },
      ],
    },
    {
      id: 'thomas-breakdown', npcId: 'thomas',
      text: 'I... I still have her phone. I read her messages. She wasn\'t cheating \u2014 she was investigating corruption. I didn\'t understand. I deleted posts because I was angry. The black square was... I don\'t know what I was thinking. I just wanted her to feel how I felt.',
      choices: [
        { id: 'thomas-c10', text: 'It\'s over, Thomas. I\'m taking this to Van Dijk.', nextNodeId: null, setFlag: 'confrontation_done', trustChange: -50 },
      ],
    },
    {
      id: 'thomas-defensive', npcId: 'thomas',
      text: 'Suspicious? I went to help! I cared about Noor! Maybe you should be looking at other people instead of harassing me.',
      choices: [
        { id: 'thomas-c11', text: 'I have evidence. We\'ll talk again.', nextNodeId: null },
      ],
    },
    {
      id: 'thomas-deflect', npcId: 'thomas',
      text: 'I wasn\'t angry. Just had enough to drink. Sometimes you need some air. That\'s all.',
      choices: [
        { id: 'thomas-c12', text: 'I\'ll come back when I have more questions.', nextNodeId: null },
      ],
    },
    {
      id: 'thomas-denial', npcId: 'thomas',
      text: 'Terrified? Of ME? We had a relationship! People argue! That doesn\'t make me a criminal.',
      choices: [
        { id: 'thomas-c13', text: 'I need more evidence. We\'re not done.', nextNodeId: null },
      ],
    },
    {
      id: 'thomas-sportief', npcId: 'thomas',
      text: '...What? That\'s just... that\'s a fitness account. Anyone could make that.',
      choices: [
        { id: 'thomas-c14', text: 'Created 3 days after the breakup. Follows only Noor\'s friends. Liked every post of hers within minutes. That\'s not fitness.', nextNodeId: 'thomas-sportief-caught', setFlag: 'has_sportief_evidence' },
      ],
    },
    {
      id: 'thomas-sportief-caught', npcId: 'thomas',
      text: 'I... I just wanted to know she was okay. I wasn\'t stalking her. I was worried.',
      choices: [
        { id: 'thomas-c15', text: 'Worried people don\'t create fake accounts. I\'ll be back with more.', nextNodeId: null, trustChange: -10 },
      ],
    },
  ],
};

// De Vries confrontation dialogue
const devriesDialogue: DialogueTree = {
  npcId: 'devries',
  nodes: [
    {
      id: 'devries-entry', npcId: 'devries', isEntry: true,
      text: 'Yes? I\'m rather busy. If this is about the missing artist, I\'ve expressed my concern publicly. The police are handling it.',
      choices: [
        { id: 'dv-c1', text: 'This is about agenda item 14b. The waterfront land deal.', nextNodeId: 'devries-14b', requiresFlag: 'studio_accessed' },
        { id: 'dv-c2', text: 'You sit on the police advisory board. You told the chief to deprioritize the case.', nextNodeId: 'devries-police', requiresTrust: 40 },
      ],
    },
    {
      id: 'devries-14b', npcId: 'devries',
      text: 'The waterfront development followed all proper procedures. It was approved by the full council. I abstained from the vote, as is appropriate.',
      choices: [
        { id: 'dv-c3', text: 'You abstained instead of recusing yourself. And the valuation was done by the buyer\'s firm.', nextNodeId: 'devries-valuation', requiresFlag: 'has_usb_drive' },
        { id: 'dv-c4', text: 'Marco van Bergen is your university friend. Delft, 1993.', nextNodeId: 'devries-marco' },
      ],
    },
    {
      id: 'devries-valuation', npcId: 'devries', questGate: 4,
      text: '...Where did you get that information? Those are internal documents. Whoever leaked them will face consequences.',
      choices: [
        { id: 'dv-c5', text: 'The valuation was \u20ac1.2M below market. Veritas Vastgoed has one client: Van Bergen. You knew.', nextNodeId: 'devries-confronted', collectEvidence: 'lotte_documents' },
      ],
    },
    {
      id: 'devries-marco', npcId: 'devries',
      text: 'I know many people. Zuidhaven is a small town. That\'s not a conflict of interest.',
      choices: [
        { id: 'dv-c6', text: 'Same university. Same golf club. And a \u20ac1.2M discount on public land.', nextNodeId: 'devries-confronted', requiresFlag: 'has_usb_drive' },
        { id: 'dv-c7', text: 'I\'ll come back with more.', nextNodeId: null },
      ],
    },
    {
      id: 'devries-confronted', npcId: 'devries',
      text: 'I advise you to be very careful with what you\'re implying. I have served this community for ten years. One more word and I\'ll have Gerard Visser contact you about defamation.',
      choices: [
        { id: 'dv-c8', text: 'I have the documents. The original valuation, the emails, the amended records. This is going public.', nextNodeId: 'devries-defeated', setFlag: 'confrontation_done' },
      ],
    },
    {
      id: 'devries-defeated', npcId: 'devries',
      text: '...I think we\'re done here. I\'ll be speaking with my lawyer.',
      choices: [
        { id: 'dv-c9', text: 'Speak with whoever you like. The truth is out.', nextNodeId: null, trustChange: -30 },
      ],
    },
    {
      id: 'devries-police', npcId: 'devries',
      text: 'That\'s a serious accusation. The advisory board provides guidance. Operational decisions are made by the chief.',
      choices: [
        { id: 'dv-c10', text: 'Guidance like "she\'s troubled, relationship problems"?', nextNodeId: 'devries-14b' },
      ],
    },
  ],
};

// Marco confrontation (leads to Ending C)
const marcoDialogue: DialogueTree = {
  npcId: 'marco',
  nodes: [
    {
      id: 'marco-entry', npcId: 'marco', isEntry: true,
      text: 'I\'m afraid I can only discuss business matters through my office. Personal inquiries should go through our PR team.',
      choices: [
        { id: 'marco-c1', text: 'The waterfront deal. You bought public land for \u20ac1.2M below market.', nextNodeId: 'marco-deal' },
        { id: 'marco-c2', text: 'You\'re connected to Noor\'s disappearance.', nextNodeId: 'marco-noor' },
      ],
    },
    {
      id: 'marco-deal', npcId: 'marco',
      text: 'All acquisitions were conducted through proper legal channels. Our valuations were independently verified. I\'d recommend speaking with our legal counsel if you have concerns.',
      choices: [
        { id: 'marco-c3', text: 'Veritas Vastgoed \u2014 your own firm. "Independent."', nextNodeId: 'marco-lawyer' },
      ],
    },
    {
      id: 'marco-noor', npcId: 'marco', questGate: 4,
      text: 'Connected? I barely knew the woman. She had a studio in a council building. That\'s the only connection. I think you\'re reaching.',
      choices: [
        { id: 'marco-c4', text: 'She found the documents proving the deal was corrupt.', nextNodeId: 'marco-lawyer' },
      ],
    },
    {
      id: 'marco-lawyer', npcId: 'marco',
      text: 'I\'m going to stop you right there. Anything further should be directed to Gerard Visser at Visser & Partners. And I\'d think very carefully before making public accusations without evidence connecting me to any person\'s whereabouts.',
      choices: [
        { id: 'marco-c5', text: 'Fine. I\'ll take my evidence elsewhere.', nextNodeId: null, setFlag: 'confrontation_done' },
      ],
    },
  ],
};

// Ahmed dialogue
const ahmedDialogue: DialogueTree = {
  npcId: 'ahmed',
  nodes: [
    {
      id: 'ahmed-entry', npcId: 'ahmed', isEntry: true,
      text: 'Come in, sit down. I\'ve been cutting hair for 30 years in this town. I know things. What do you want to know?',
      choices: [
        { id: 'ahmed-c1', text: 'Did you see Thomas after the night Noor disappeared?', nextNodeId: 'ahmed-thomas' },
        { id: 'ahmed-c2', text: 'What\'s the gossip about the waterfront deal?', nextNodeId: 'ahmed-gossip' },
      ],
    },
    {
      id: 'ahmed-thomas', npcId: 'ahmed',
      text: 'Next morning. Came in for a trim but couldn\'t sit still. Jittery, checking his phone every two seconds. And I noticed \u2014 he still had Noor\'s photo as his phone wallpaper. Four months after the breakup. That\'s not normal.',
      choices: [
        { id: 'ahmed-c3', text: 'That\'s significant. Anything else?', nextNodeId: 'ahmed-more', collectEvidence: 'ahmed_testimony' },
      ],
    },
    {
      id: 'ahmed-more', npcId: 'ahmed',
      text: 'Thirty years in this chair. I know when someone has something to hide. Thomas was hiding something. His hands were shaking. He kept saying "she\'ll be fine, she just needs space." Nobody asked him.',
      choices: [
        { id: 'ahmed-c4', text: 'Thank you, Ahmed. Your observations are valuable.', nextNodeId: null, trustChange: 10 },
      ],
    },
    {
      id: 'ahmed-gossip', npcId: 'ahmed',
      text: 'Everyone talks in the barber chair. Henk Mulder \u2014 works for Marco \u2014 he let slip once that the boss and the wethouder were "laughing about getting the land for nothing." Beer talking, maybe. But this chair doesn\'t lie.',
      choices: [
        { id: 'ahmed-c5', text: 'That\'s useful. What about Thomas?', nextNodeId: 'ahmed-thomas' },
        { id: 'ahmed-c6', text: 'Thanks Ahmed. I\'ll follow up on that.', nextNodeId: null, trustChange: 5, setFlag: 'ahmed_gossip_heard' },
      ],
    },
  ],
};

// Lotte / Anonymous tipster dialogue
const lotteDialogue: DialogueTree = {
  npcId: 'lotte',
  nodes: [
    {
      id: 'lotte-entry', npcId: 'lotte', isEntry: true,
      text: 'Oh! I... I can\'t really talk about work. Procedures, you know. Is there something specific?',
      choices: [
        { id: 'lotte-c1', text: 'I know you\'re @anoniem_tipgever.', nextNodeId: 'lotte-caught', requiresTrust: 40, requiresFlag: 'studio_accessed' },
        { id: 'lotte-c2', text: 'The waterfront land deal. You processed the paperwork.', nextNodeId: 'lotte-paperwork' },
      ],
    },
    {
      id: 'lotte-paperwork', npcId: 'lotte',
      text: 'I process many things. That\'s my job. I can\'t comment on specific transactions.',
      choices: [
        { id: 'lotte-c3', text: 'The valuation was \u20ac1.2M below market. You noticed.', nextNodeId: 'lotte-caught', requiresTrust: 40 },
      ],
    },
    {
      id: 'lotte-caught', npcId: 'lotte', requiresTrust: 40,
      text: '...Please. If De Vries finds out it was me... I have a family. I only posted late at night. I was careful. How did you...?',
      choices: [
        { id: 'lotte-c4', text: 'You did the right thing. I need the actual documents to finish this.', nextNodeId: 'lotte-documents', requiresTrust: 55 },
        { id: 'lotte-c5', text: 'Your identity is safe with me. But I need help.', nextNodeId: 'lotte-help', trustChange: 10 },
      ],
    },
    {
      id: 'lotte-help', npcId: 'lotte',
      text: 'What do you need? I can\'t take original files \u2014 they\'d notice. But I have... copies. At home. I made them the day I processed the deal because something felt very, very wrong.',
      choices: [
        { id: 'lotte-c6', text: 'Those copies could expose the entire deal. Will you share them?', nextNodeId: 'lotte-documents', requiresTrust: 55 },
      ],
    },
    {
      id: 'lotte-documents', npcId: 'lotte', requiresTrust: 55,
      text: 'I have copies of everything. The original municipal valuation showing \u20ac2.6M. The Veritas valuation at \u20ac1.6M. Emails between De Vries and Marco\'s lawyers discussing "flexible pricing." And the amended council record where De Vries changed his vote from "present" to "abstained" after the fact.',
      choices: [
        { id: 'lotte-c7', text: 'This is incredible. Thank you, Lotte. This ends De Vries.', nextNodeId: null, collectEvidence: 'lotte_documents', trustChange: 20, setFlag: 'corruption_evidence_complete' },
      ],
    },
  ],
};

// Anouk dialogue
const anoukDialogue: DialogueTree = {
  npcId: 'anouk',
  nodes: [
    {
      id: 'anouk-entry', npcId: 'anouk', isEntry: true,
      text: 'I screenshot everything. Every beautiful post. Every @noor_creates piece. And I noticed something. Posts are missing.',
      choices: [
        { id: 'anouk-c1', text: 'Which posts are missing?', nextNodeId: 'anouk-missing', collectEvidence: 'deleted_posts' },
        { id: 'anouk-c2', text: 'Can you show me the screenshots?', nextNodeId: 'anouk-screenshots' },
      ],
    },
    {
      id: 'anouk-missing', npcId: 'anouk',
      text: 'All the recent ones! Posts about being followed, weird DMs, someone watching the studio at night. ALL deleted from her account. Noor wouldn\'t delete those. Someone with access to her account removed them.',
      choices: [
        { id: 'anouk-c3', text: 'Can you send me the screenshots? This is evidence.', nextNodeId: 'anouk-screenshots' },
      ],
    },
    {
      id: 'anouk-screenshots', npcId: 'anouk',
      text: 'Here. I have them all. "Someone walked past my window." "New accounts following me." "Person across the street just standing there." These were cries for help. And someone erased them.',
      choices: [
        { id: 'anouk-c4', text: 'This proves someone tampered with her account. Thank you, Anouk.', nextNodeId: null, trustChange: 10, setFlag: 'viewed_deleted_posts_evidence' },
      ],
    },
  ],
};

// Nina dialogue
const ninaDialogue: DialogueTree = {
  npcId: 'nina',
  nodes: [
    {
      id: 'nina-entry', npcId: 'nina', isEntry: true,
      text: 'Welcome to De Brug. Looking for a book, or looking for answers?',
      choices: [
        { id: 'nina-c1', text: 'Pim left you an envelope. I need it.', nextNodeId: 'nina-envelope', requiresTrust: 30 },
        { id: 'nina-c2', text: 'What do you know about Noor?', nextNodeId: 'nina-noor' },
      ],
    },
    {
      id: 'nina-noor', npcId: 'nina',
      text: 'Sweet girl. Came in every Tuesday. Always left with something unexpected. She had a curious mind. Last time she came in, she asked about local government records. How to read council minutes.',
      choices: [
        { id: 'nina-c3', text: 'Council minutes. Item 14b. The land deal.', nextNodeId: 'nina-envelope', requiresTrust: 30 },
      ],
    },
    {
      id: 'nina-envelope', npcId: 'nina', requiresTrust: 30,
      text: 'Pim said: "If someone asks with the right question, give it to them." So tell me \u2014 what did Noor find at the art centre?',
      choices: [
        { id: 'nina-c4', text: 'She found documents proving the waterfront land was sold to De Vries\' friend for \u20ac1.2M below market value.', nextNodeId: 'nina-gives', requiresFlag: 'studio_accessed' },
      ],
    },
    {
      id: 'nina-gives', npcId: 'nina',
      text: 'That\'s the right question. Here. Pim\'s investigation notes. Everything he found, documented. Sources, dates, connections. He was building a case. Use it well.',
      choices: [
        { id: 'nina-c5', text: 'Thank you, Nina. This is exactly what I needed.', nextNodeId: null, collectEvidence: 'pim_envelope', trustChange: 15 },
      ],
    },
  ],
};

// Jordy dialogue
const jordyDialogue: DialogueTree = {
  npcId: 'jordy',
  nodes: [
    {
      id: 'jordy-entry', npcId: 'jordy', isEntry: true,
      text: 'Yo. You\'re the one asking questions about Noor? I might have seen something. Police didn\'t care though lol.',
      choices: [
        { id: 'jordy-c1', text: 'What did you see that night?', nextNodeId: 'jordy-saw' },
      ],
    },
    {
      id: 'jordy-saw', npcId: 'jordy',
      text: 'I was skating near Sophie Janssen\'s building. Like 11pm ish. A car pulled up \u2014 dark hatchback. A woman came out of the building, got in fast, and they drove off. She looked like she was in a hurry. Or scared.',
      choices: [
        { id: 'jordy-c2', text: 'Did you see the driver?', nextNodeId: 'jordy-driver', setFlag: 'witness_jordy' },
      ],
    },
    {
      id: 'jordy-driver', npcId: 'jordy',
      text: 'Nah, too dark. But it was a small car, dark blue or black maybe. And the woman \u2014 could have been Noor. Right height, dark hair. She basically jumped in and they were gone.',
      choices: [
        { id: 'jordy-c3', text: 'That was Pim picking up Noor. You\'re a key witness, Jordy.', nextNodeId: 'jordy-whoa' },
        { id: 'jordy-c4', text: 'Thanks. That\'s helpful.', nextNodeId: null, trustChange: 5 },
      ],
    },
    {
      id: 'jordy-whoa', npcId: 'jordy',
      text: 'Wait, for real? Should I go to the police? I literally posted about it and nobody cared. "Not my business but dramatic lol." I didn\'t know it was actually important!',
      choices: [
        { id: 'jordy-c5', text: 'Yes, tell Van Dijk what you saw. It matters.', nextNodeId: null, trustChange: 10, setFlag: 'jordy_will_testify' },
      ],
    },
  ],
};

// Dominee dialogue
const domineeDialogue: DialogueTree = {
  npcId: 'dominee',
  nodes: [
    {
      id: 'dom-entry', npcId: 'dominee', isEntry: true,
      text: 'Come in. Everyone is welcome here. I sense you carry a heavy question.',
      choices: [
        { id: 'dom-c1', text: 'You had a pastoral conversation with Thomas. What did he tell you?', nextNodeId: 'dom-thomas' },
      ],
    },
    {
      id: 'dom-thomas', npcId: 'dominee',
      text: 'I cannot break pastoral confidence. You understand. But I can say this: some people come to me because they are afraid of what they might do. Others come because they are afraid of what they have already done.',
      choices: [
        { id: 'dom-c2', text: 'Thomas came because of something he\'d done.', nextNodeId: 'dom-nudge', requiresTrust: 30 },
        { id: 'dom-c3', text: 'I understand. Thank you, Reverend.', nextNodeId: null, trustChange: 5 },
      ],
    },
    {
      id: 'dom-nudge', npcId: 'dominee', requiresTrust: 30,
      text: 'I cannot confirm or deny. But I will say this: if you are looking for someone who carries guilt, look for someone who speaks too much about wanting to help. Guilt makes people perform concern. True concern is quiet.',
      choices: [
        { id: 'dom-c4', text: 'Thomas went to the police "to help." He\'s performing concern.', nextNodeId: null, collectEvidence: 'reverend_hint', trustChange: 10 },
      ],
    },
  ],
};

// Bas dialogue
const basDialogue: DialogueTree = {
  npcId: 'bas',
  nodes: [
    {
      id: 'bas-entry', npcId: 'bas', isEntry: true,
      text: 'Hey! Open mic regular here. Yeah, I was at \'t Morgenrood that night. Wild times.',
      choices: [
        { id: 'bas-c1', text: 'You saw Thomas leave angry. Tell me what happened.', nextNodeId: 'bas-thomas', setFlag: 'witness_bas' },
      ],
    },
    {
      id: 'bas-thomas', npcId: 'bas',
      text: 'Around ten, maybe? Thomas was drinking with Henk. Then something set him off \u2014 maybe checking his phone? He just got up and stormed out. Didn\'t even finish his beer. His face was... intense. Like rage.',
      choices: [
        { id: 'bas-c2', text: 'Did Henk say anything after Thomas left?', nextNodeId: 'bas-henk' },
        { id: 'bas-c3', text: 'Thanks Bas. That\'s what I needed.', nextNodeId: null, trustChange: 5 },
      ],
    },
    {
      id: 'bas-henk', npcId: 'bas',
      text: 'Henk just shrugged and ordered another beer. Said something like "there he goes again" \u2014 like this was normal Thomas behaviour. That stuck with me.',
      choices: [
        { id: 'bas-c4', text: '"Again." So this was a pattern. Thanks, Bas.', nextNodeId: null, trustChange: 5, setFlag: 'bas_henk_pattern' },
      ],
    },
  ],
};

// Emma dialogue
const emmaDialogue: DialogueTree = {
  npcId: 'emma',
  nodes: [
    {
      id: 'emma-entry', npcId: 'emma', isEntry: true,
      text: 'The person watching the art centre? I\'ve seen them twice. It was creepy. Walking home from ballet alone is already scary enough.',
      choices: [
        { id: 'emma-c1', text: 'Can you describe them?', nextNodeId: 'emma-describe' },
      ],
    },
    {
      id: 'emma-describe', npcId: 'emma',
      text: 'Tall. Athletic build. Just standing there, across the street, looking at the building. Not on a phone, not walking \u2014 just watching. I crossed the street both times. It felt wrong.',
      choices: [
        { id: 'emma-c2', text: 'That sounds like Thomas Groot. Did you see his face?', nextNodeId: 'emma-face' },
        { id: 'emma-c3', text: 'Thank you. This confirms what others have seen.', nextNodeId: null, trustChange: 5 },
      ],
    },
    {
      id: 'emma-face', npcId: 'emma',
      text: 'Too dark. But the build matches \u2014 he does personal training at the gym. I\'ve seen him around. Same height, same shoulders. I can\'t say for sure it was him. But... yeah. It fits.',
      choices: [
        { id: 'emma-c4', text: 'One more piece of the puzzle. Thank you, Emma.', nextNodeId: null, trustChange: 5 },
      ],
    },
  ],
};

// Gerrit dialogue
const gerritDialogue: DialogueTree = {
  npcId: 'gerrit',
  nodes: [
    {
      id: 'gerrit-entry', npcId: 'gerrit', isEntry: true,
      text: 'I told the police and they didn\'t care. Sixty years in this town and they treat me like I\'m making things up.',
      choices: [
        { id: 'gerrit-c1', text: 'Tell me what you saw that night.', nextNodeId: 'gerrit-saw' },
      ],
    },
    {
      id: 'gerrit-saw', npcId: 'gerrit',
      text: 'Quarter to eleven. I was closing up \u2014 always do one last check of the shop. A woman ran past. Not jogging \u2014 running. Like someone scared. Dark hair, young. She was heading toward the apartment buildings.',
      choices: [
        { id: 'gerrit-c2', text: 'Toward Sophie Janssen\'s building?', nextNodeId: 'gerrit-direction', setFlag: 'witness_gerrit' },
      ],
    },
    {
      id: 'gerrit-direction', npcId: 'gerrit',
      text: 'That direction, yes. And I could see she wasn\'t dressed for exercise. No jacket, no bag. Someone running from something, not to something.',
      choices: [
        { id: 'gerrit-c3', text: 'That was Noor. Running from the art centre to Sophie\'s. You\'re a witness, Gerrit.', nextNodeId: null, trustChange: 10, setFlag: 'gerrit_confirmed_runner' },
      ],
    },
  ],
};

export const allDialogues: DialogueTree[] = [
  lisaDialogue,
  davidDialogue,
  sophieDialogue,
  pimDialogue,
  vandijkDialogue,
  milaDialogue,
  yaraDialogue,
  thomasDialogue,
  devriesDialogue,
  marcoDialogue,
  ahmedDialogue,
  lotteDialogue,
  anoukDialogue,
  ninaDialogue,
  jordyDialogue,
  domineeDialogue,
  basDialogue,
  emmaDialogue,
  gerritDialogue,
];

export function getDialogueTree(npcId: string): DialogueTree | undefined {
  return allDialogues.find(d => d.npcId === npcId);
}

export function getEntryNode(tree: DialogueTree): DialogueNode | undefined {
  return tree.nodes.find(n => n.isEntry);
}

export function getNode(tree: DialogueTree, nodeId: string): DialogueNode | undefined {
  return tree.nodes.find(n => n.id === nodeId);
}
