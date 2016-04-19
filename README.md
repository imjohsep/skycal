## Installation

Open up a new terminal tab and run `mongod`

**Installing Mongo**
```
brew update
brew install mongodb
sudo mkdir -p /data/db
sudo chown -R $USER /data/db
```
**Start and Stop Mongodb**
```
brew services start mongodb
brew services stop mongodb
```

**Import Data**
```
mongoimport --db skycal --collection events --type json --file ./models/seed/04-09-2016.json
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
npm run lint
```

**Generate code coverage report**
```
npm run test:cov
```
