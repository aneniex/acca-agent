// Canned responses for common small-talk, greetings, slang, and abusive inputs
// The goal is to avoid unnecessary API calls for frequent, simple messages.

const CannedResponses = (() => {
  function normalize(text) {
    return (text || '')
      .toLowerCase()
      .replace(/[\u2018\u2019\u201C\u201D]/g, '"')
      .replace(/[^a-z0-9\s']/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const entries = [
    { patterns: ['hi', 'hi there', 'hii', 'hiii'], reply: 'Hi there! How can I help with ACCA topics today?' },
    { patterns: ['hello', 'hello there'], reply: 'Hello! What would you like to learn about ACCA or auditing?' },
    { patterns: ['hey', 'hey there'], reply: 'Hey! Need help with IFRS, ISA, or exam prep?' },
    { patterns: ['yo'], reply: 'Yo! What ACCA topic can I help you with?' },
    { patterns: ['good morning', 'morning'], reply: 'Good morning! Ready to study some ACCA concepts?' },
    { patterns: ['good afternoon', 'afternoon'], reply: 'Good afternoon! How can I support your ACCA prep?' },
    { patterns: ['good evening', 'evening'], reply: 'Good evening! What would you like to cover today?' },
    { patterns: ['good night', 'gn', 'nite'], reply: 'Good night! Come back anytime for ACCA study help.' },

    { patterns: ['how are you', 'how r u', 'hru', "how's it going", 'whats up', "what's up", 'sup', 'wassup', 'wazzup'], reply: "I'm doing great and ready to help with ACCA. What’s your question?" },
    { patterns: ["what's new", 'whats new'], reply: 'Always learning! Do you want updates on ACCA standards or exam tips?' },
    { patterns: ['who are you', 'what are you'], reply: 'I’m ACCA Agent—your study companion for ACCA standards, auditing, and exam prep.' },
    { patterns: ['what can you do', 'help', 'help me'], reply: 'I can explain ACCA standards (IFRS/ISA), give examples, and help with exam prep. Ask me anything!' },

    { patterns: ['thank you', 'thanks', 'thx', 'ty', 'thanks a lot'], reply: 'You’re welcome! Happy to help. Need anything else?' },
    { patterns: ['ok', 'k', 'okay', 'alright', 'cool', 'nice'], reply: 'Great! If you want, I can suggest a practice question.' },
    { patterns: ['bye', 'goodbye', 'see ya', 'see you', 'cya', 'later'], reply: 'Goodbye! Keep up the great work with your ACCA studies.' },

    // Explicit practice question intent (placed before generic small-talk matches by using longest-match logic)
    { patterns: ['suggest a practice question', 'ok suggest a practice question', 'give me a question', 'practice question', 'ask me a question'], reply: 'Here’s a practice question: Under ISA 505, why are positive confirmations generally considered more reliable than negative confirmations? Provide two reasons and one example. Would you like the model answer?' },

    // Polite refusals / boundaries
    { patterns: ['fuck you', 'f u', 'f off', 'stfu', 'shut up'], reply: 'I’m here to help. Let’s keep things respectful. What ACCA topic can I assist with?' },
    { patterns: ['get lost', 'go away'], reply: 'No problem. If you need help later, I’ll be here.' },
    { patterns: ['idiot', 'stupid', 'dumb bot', 'useless'], reply: 'I may not be perfect, but I’m committed to helping you learn ACCA. How can I assist?' },
    { patterns: ['you are wrong', 'you are incorrect'], reply: 'Thanks for the feedback. Tell me what seems off and I’ll correct it.' },

    // Short fillers
    { patterns: ['hmm', 'hmmm', 'hmmmm'], reply: 'Take your time. Want a quick summary of a standard?' },
    { patterns: ['lol', 'lmao', 'rofl'], reply: '😄 Glad to see some humor! Shall we continue with ACCA topics?' },
    { patterns: ['brb'], reply: 'Sure, I’ll be here when you’re back.' },
    { patterns: ['omg', 'wow'], reply: 'It can be a lot! Want me to simplify the key points?' },

    // Info prompts
    { patterns: ['who created you', 'who made you'], reply: 'I was built to help students with ACCA topics using concise explanations and examples.' },
    { patterns: ['where are you from'], reply: 'I live on the web—available anytime to help with ACCA.' },

    // Study prompts
    { patterns: ['suggest a topic', 'what should i study', 'recommend a topic'], reply: 'How about a quick review of ISA 570 (Going Concern) or IFRS 15 (Revenue)?' },
    { patterns: ['give me a question', 'practice question'], reply: 'Here’s a quick one: Explain the purpose of external confirmations under ISA 505. Want the answer too?' },
    { patterns: ['define acca'], reply: 'ACCA is the Association of Chartered Certified Accountants, a leading global accountancy body.' },

    // Clarifications
    { patterns: ['i don\'t understand', 'idk', 'confused'], reply: 'No problem—would you like a simpler explanation or a real-world example?' },
    { patterns: ['example please', 'give example', 'show example'], reply: 'Sure! Tell me the topic (e.g., IFRS 15, ISA 505) and I’ll give a practical example.' },

    // Emojis / minimal
    { patterns: [':)', '🙂', '😊'], reply: '🙂 Great! What should we cover next?' },
    { patterns: [':(', '🙁', '😞'], reply: 'Sorry to hear that. Want a quick summary to make things easier?' },
    { patterns: ['👍', '👌', '✅'], reply: 'Awesome! Want another question?' },

    // Small talk variations (adding many patterns to reach ~100)
    { patterns: ['yo bro', 'yo man', 'hey bro', 'hey man'], reply: 'Hey! How can I help with your ACCA prep today?' },
    { patterns: ['bro', 'bruh'], reply: 'I’ve got you. Which ACCA standard are you working on?' },
    { patterns: ['mate'], reply: 'Sure thing, mate! What ACCA topic can I assist with?' },
    { patterns: ['buddy', 'pal'], reply: 'Happy to help, friend. What should we study?' },
    { patterns: ['greetings'], reply: 'Greetings! Ready to dive into ACCA content?' },
    { patterns: ['peace'], reply: '✌️ Catch you later—come back anytime for ACCA help.' },
    { patterns: ['respect'], reply: 'Respect! Want a quick standard summary?' },
    { patterns: ['thanks bro', 'thanks mate', 'cheers'], reply: 'Cheers! Need help with any other topic?' },
    { patterns: ['no'], reply: 'Okay. If you change your mind, I’m here to help.' },
    { patterns: ['yes'], reply: 'Great! Tell me your question.' },
    { patterns: ['maybe'], reply: 'No rush. Want me to suggest a topic?' },
    { patterns: ['who am i'], reply: 'You’re a dedicated learner! Which ACCA concept can I help with?' },
    { patterns: ['are you real'], reply: 'I’m a virtual assistant focused on ACCA learning.' },
    { patterns: ['do you sleep'], reply: 'Never—I’m available 24/7 for ACCA support.' },
    { patterns: ['what time is it'], reply: 'I don’t track local time, but I can help you save time studying!' },
    { patterns: ['sing a song', 'tell a joke'], reply: 'I’m better with ACCA than singing, but here’s a tip: external confirmations (ISA 505) increase audit evidence reliability.' },
    { patterns: ['calm down', 'relax'], reply: 'All good. Want a quick recap or should we continue?' },
    { patterns: ['stop'], reply: 'Okay—I’ll pause. Ask when you’re ready.' },
    { patterns: ['continue'], reply: 'Sure—what part would you like me to expand on?' },
    { patterns: ['repeat'], reply: 'I can rephrase or summarize. Which part was unclear?' },
    { patterns: ['summarize'], reply: 'I can summarize any topic. Paste the text or name the standard.' },
    { patterns: ['explain again'], reply: 'I’ll simplify it. Which section should I explain again?' },
    { patterns: ['give example'], reply: 'Tell me the topic and I’ll give a practical example.' },
    { patterns: ['exam tips'], reply: 'Practice past questions, focus on verbs, and manage time—want detailed tips?' },
    { patterns: ['standards'], reply: 'We can cover IFRS, IAS, or ISA topics. Which one?' },

    // More slang/short forms
    { patterns: ['wtf'], reply: 'Let’s keep it respectful. Tell me what’s confusing and I’ll clarify.' },
    { patterns: ['wth'], reply: 'I’m here to help—what part doesn’t make sense?' },
    { patterns: ['idc'], reply: 'No worries. Want a short summary to make it easier?' },
    { patterns: ['idgaf'], reply: 'Understood. If you ever need ACCA help, I’ll be here.' },
    { patterns: ['ffs'], reply: 'I get it—some topics are tricky. Want me to simplify it?' },
    { patterns: ['np', 'no problem'], reply: 'Great! Anything else I can help with?' },
    { patterns: ['gg'], reply: 'Good going! Want another question?' },
    { patterns: ['rip'], reply: 'Let’s revive your confidence—pick a topic and I’ll help.' },
    { patterns: ['smh'], reply: 'I know it can be frustrating. Want a simpler version?' },
    { patterns: ['tbh'], reply: 'Honestly, consistent practice is key. Want a small daily plan?' },
    { patterns: ['imo', 'imho'], reply: 'I value your view. Want references to official guidance?' },
    { patterns: ['btw'], reply: 'By the way, ISA 570 is a common exam area. Want a summary?' },

    // Courtesy / empathy
    { patterns: ['sorry', 'sry'], reply: 'No worries! How can I assist now?' },
    { patterns: ['congrats', 'congratulations'], reply: 'Congratulations! Ready for the next ACCA milestone?' },
    { patterns: ['happy birthday'], reply: '🎉 Thank you! Now, which ACCA topic should we study?' },
    { patterns: ['good job', 'well done'], reply: 'Thanks! Want to tackle a tougher question next?' },

    // Language variants
    { patterns: ['hola'], reply: 'Hola! How can I help with ACCA today?' },
    { patterns: ['salut'], reply: 'Salut! Besoin d’aide pour l’ACCA?' },
    { patterns: ['namaste'], reply: 'Namaste! What ACCA topic would you like to discuss?' },
    { patterns: ['as-salamu alaykum', 'assalamualaikum', 'salam'], reply: 'Wa alaykumu s-salam! How may I help with ACCA?' },

    // Fallback short asks
    { patterns: ['who is acca'], reply: 'ACCA is a global professional accounting body. Do you want details on qualification structure?' },
    { patterns: ['what is isa 570'], reply: 'ISA 570 covers going concern. Want a concise summary or an example paragraph?' },
    { patterns: ['ifrs 15'], reply: 'IFRS 15 deals with revenue from contracts with customers. Want the 5-step model?' },
    { patterns: ['isa 505'], reply: 'ISA 505 covers external confirmations. Want procedures and examples?' },
  ];

  // Build fast lookup by normalized pattern
  const lookup = new Map();
  entries.forEach(e => e.patterns.forEach(p => lookup.set(normalize(p), e.reply)));

  function getReply(userInput) {
    const n = normalize(userInput);
    if (!n) return null;

    // Exact match
    if (lookup.has(n)) return lookup.get(n);

    // Prefer the longest pattern that matches as a whole word within the input
    let best = null;
    for (const [key, value] of lookup.entries()) {
      if (!key) continue;
      const re = new RegExp(`(^|\\s)${key.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}(?=$|\\s)`);
      if (re.test(n)) {
        if (!best || key.length > best.key.length) {
          best = { key, value };
        }
      }
    }
    return best ? best.value : null;
  }

  return { getReply };
})();

window.CannedResponses = CannedResponses;
