import { parse } from "papaparse";

/**
 * https://github.com/dikonov/Universal-Dictionary-of-Concepts/blob/master/docs/File%20format%20(ENG).md
 * 
 * Local dictionary format
 * Each file named dict-nl-<ISO language code>.csv contains links between UWs and words of a single natural language. There may be several volume files for different dialects of orthography variants of the same language.
 * 
 * Columns left to right:
 * 
 * 1 - [ lemma ] If this field is empty, it means that the corresponding UNL concept has no good translation into this natural language. The field can also contain a multiword expression, e.g. a technical term or an idiom. All words or expressions linked to the same UW are considered to be exact synonyms and share similar stylistic and usage restrictions.
 * 2 - { links to internal dictionaries of the system(s), which support conversion of texts between UNL and this natural language. }
 * 3 - " a UW representing one of the word-senses of the word in column 1 "
 * 4,5 - a gloss (comment and example) from Wordnet or another dictionary. Only for convinience! All glosses are tied only to UWs. It should match the NL word, but it is not the official definition. If there is a gloss in the volume's natural language, it should be used here, otherwise an English gloss is allowed.
 * 6 - part of speech and basic required morphological and syntactic features (such as gender). The exact contents is language specific.
 * 7 - service flags showing the source and current status of the word-UW link. It may start with a number, which is a 1-5 score reflecting credibility of the word-UW link. Higher is better.
 */
export interface UnlConcept {
  /**
   * [ lemma ] If this field is empty, it means that the corresponding UNL concept has no good translation into this natural language. The field can also contain a multiword expression, e.g. a technical term or an idiom. All words or expressions linked to the same UW are considered to be exact synonyms and share similar stylistic and usage restrictions.
   */
  lemma: string;
  /**
   * { links to internal dictionaries of the system(s), which support conversion of texts between UNL and this natural language. }
   */
  links: string;
  /**
   * a UW representing one of the word-senses of the word in column 1
   */
  uw: string;
  /**
   * a gloss (comment and example) from Wordnet or another dictionary. Only for convinience! All glosses are tied only to UWs. It should match the NL word, but it is not the official definition. If there is a gloss in the volume's natural language, it should be used here, otherwise an English gloss is allowed.
   */
  gloss_comment: string;
  /**
   * a gloss (comment and example) from Wordnet or another dictionary. Only for convinience! All glosses are tied only to UWs. It should match the NL word, but it is not the official definition. If there is a gloss in the volume's natural language, it should be used here, otherwise an English gloss is allowed.
   */
  gloss_example: string;
  /**
   * part of speech and basic required morphological and syntactic features (such as gender). The exact contents is language specific.
   */
  part_of_speech: string;
  /**
   * service flags showing the source and current status of the word-UW link. It may start with a number, which is a 1-5 score reflecting credibility of the word-UW link. Higher is better.
   */
  uw_status: string;
}

export async function getDict() {
  const res = await fetch(
    "https://raw.githubusercontent.com/dikonov/Universal-Dictionary-of-Concepts/refs/heads/master/data/csv/dict-nl-eng.csv",
  );
  const text = await res.text();
  return parse<[
    lemma: string,
    links: string,
    uw: string,
    gloss_comment: string,
    gloss_example: string,
    part_of_speech: string,
    uw_status: string,
  ]>(text, { header: false, skipEmptyLines: true, delimiter: '\t',  }).data.map(
    ([lemma, links, uw, gloss_comment, gloss_example, part_of_speech, uw_status]) => ({
      lemma: lemma.replace('[', '').replace(']', ''),
      links,
      uw,
      gloss_comment,
      gloss_example,
      part_of_speech,
      uw_status,
    }),
  );
}
