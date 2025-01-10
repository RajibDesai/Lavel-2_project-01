import parser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier'; // Prettier এর কনফ্লিক্ট সমাধানের জন্য

export default [
  {
    files: ['**/*.ts', '**/*.tsx'], // শুধু TypeScript ফাইলের জন্য
    ignores: ['node_modules/', 'dist/', 'build/'],
    languageOptions: {
      parser: parser, // TypeScript পার্সার
      parserOptions: {
        ecmaVersion: 2024, // ES2024 এর জন্য সাপোর্ট
        sourceType: 'module', // মডিউল সাপোর্ট
      },
      globals: {
        process: 'readonly', // Node.js গ্লোবাল / process কে গ্লোবাল হিসেবে চিহ্নিত
        console: 'readonly', // console গ্লোবাল
      },
    },
    plugins: {
      prettier: prettierPlugin, // Prettier প্লাগইন
    },
    rules: {
      'prettier/prettier': 'error', // Prettier এর ত্রুটি চেক
      'no-console': 'warn',
      'no-alert': 'warn', // alert, confirm, এবং prompt ব্যবহার করলে সতর্ক করবে
      'default-case': 'error', // switch স্টেটমেন্টে default case থাকা বাধ্যতামূলক
      'dot-notation': 'error', // অব্যবহৃত স্ট্রিং সাবস্ক্রিপশন এড়িয়ে চলুন
      'no-var': 'error', // var ব্যবহার নিষিদ্ধ, const/let ব্যবহার করতে হবে
      'prefer-const': 'error', // যদি সম্ভব হয়, const ব্যবহার করুন
      'no-empty-function': 'warn', // খালি ফাংশন থাকলে সতর্ক করবে
      'no-unused-expressions': 'error',
      'no-undef': 'error',
    },
  },
  // Prettier এর রুলস কনফ্লিক্ট সরাতে আলাদা ফাইল সেটআপ
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    rules: {
      ...prettierConfig.rules, // Prettier এর রুলস ইমপোর্ট করে কনফ্লিক্ট রোধ
    },
  },
];

// এই প্যাকেজটি install করার পর সমস্যা সমাধান হয়েছে npm install eslint-config-standard eslint-config-prettier --save-dev
