![Screenshot 2025-05-16 at 14 21 46](https://github.com/user-attachments/assets/ca41b110-b86d-4598-9b32-6e041fd0193a)

# JSONPlaceholder with Playwright and DTOs

```shell
├── package.json
├── tsconfig.json
├── playwright.config.ts
├── src/
│   ├── dtos/            
│   ├── models/          
│   ├── services/        
│   ├── utils/           
│   └── validators/      
└── tests/   
```

# 1️⃣ How to run: 

```shell
$ npm test
```

# 2️⃣ How to run in parallel execution with certain amount of workers: 
```shell
$ npx playwright test --workers=4
```

# 3️⃣ How to run in parallel execution with a script from package.json
To run it you would need to use a script, this is an example: 

> "test:workers:2": "playwright test --workers=2",

## To run it in the terminal: 
```shell
$ npm run test:workers:2
```

# ⚙️ TODO 🪚🪏
- [ ] Use environment variables and implement it with dotenv
- [ ] Make the schema validation for comments
- [ ] Make the schema validation for Users
- [ ] Make the schema validation for photo
- [ ] Make the schema validation for album


## 🔥 Framework in progress...