# Rick And Morty Api

[Api](https://rickandmortyapi.com/documentation) documentation used in this case.

## Arquitechture

### **Infrastructure**

Infrastructure is composed of two main components:

* *DataSources* - component that provides data to the application.
  * *Located in:* src/dataSources

* *Controllers* - is a point of entry to the application.
  * *Located in:* src/controllers/http

### **Application**

* *Interactors* - component that comunicates with the data sources. And provides the data to the controllers.
  * *Located in:* src/core/interactors

### **Domain**

* *Entities* - component that represents the domain model.
  * *Located in:* src/core/entities

## Compile and run

### With docker

```bash
docker build -t rick-and-morty-api .

docker run -p 8000:8000 -it --name rick-and-morty-api rick-and-morty-api
```

### Using docker-compose

```bash
docker-compose up
```

### Locally

```bash
npm install --force

npm start
```

Running in <http://localhost:8000>

## Available routes

* GET <http://localhost:8000/> --> Complete exercise.

* GET <http://localhost:8000/char_counter> --> Char counter exercise.

* GET <http://localhost:8000/episodes_location> --> Episodes location exercise.

## Tests

```bash
npm run test
```

Tests ensure that the application is working as expected. And Exercises time execution is less than 3 seconds.
