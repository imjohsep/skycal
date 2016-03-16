## Installation

Open up a new terminal tab and run `mongod`

**Starting Server**
```
npm install
mongoimport --db skycal --collection events --type json --file ./models/seed.json
```

## Usage

**Start the application in dev mode with hot-module-replacement**
```
npm start
```

**Run tests**
```
npm test
```

**Build for production**
```
npm run build
```

**Run production version**
```
npm run build:start
```

**Run code style check with standard**
```
npm run check-style
```

**Generate code coverage report**
```
npm run test:cov
```