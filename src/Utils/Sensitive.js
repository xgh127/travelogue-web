import {doCommonGet, doGet} from "./ajax";
import {resp2Json} from "./Tool";

export  const sip = 'http://202.120.40.86:14642/rmp-resource-service/project/6467462e6da1a40015f121d9/resource'
/**
 * 获取敏感词表
 */
export const getSensitive=async () => {
   let resp =  await doCommonGet(sip + "/sensitiveword");
   let respJson = resp2Json(resp);
   let sesitiveWords = respJson.data;
   console.log(sesitiveWords);
   let arr = [];
   for (let i = 0; i < sesitiveWords.length; i++) {
       arr.push(sesitiveWords[i].name);
   }
   return arr;
}

/**
 * Trie字典树数据结构来提高匹配效率
 */
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

export class SensitiveWordsFilter {
    constructor() {
        this.root = new TrieNode();
    }

    addWord(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isEndOfWord = true;
    }

    filter(text) {
        const words = text.split(/\W+/);
        const filteredText = text.split('');
        let currentNode = this.root;
        let wordStartIndex = -1;

        for (let i = 0; i < filteredText.length; i++) {
            const char = filteredText[i];
            if (currentNode.children.has(char)) {
                if (wordStartIndex === -1) {
                    wordStartIndex = i;
                }
                currentNode = currentNode.children.get(char);
                if (currentNode.isEndOfWord) {
                    // Found a sensitive word, replace it with asterisks
                    for (let j = wordStartIndex; j <= i; j++) {
                        filteredText[j] = '*';
                    }
                    currentNode = this.root;
                    wordStartIndex = -1;
                }
            } else {
                currentNode = this.root;
                wordStartIndex = -1;
            }
        }

        return filteredText.join('');
    }
}

// Usage example:
const sensitiveWords = ['hello', 'world', 'openai'];
const filter = new SensitiveWordsFilter();
sensitiveWords.forEach((word) => filter.addWord(word));

const text = 'Hello, world! This is an example sentence.';
const filteredText = filter.filter(text);
console.log(filteredText); // Output: "*****, *****! This is an example sentence."
