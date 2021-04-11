# Documentation

# Install Steps

```
npm install
```

Run offline

```
npx sls offline start
```

Deploy in AWS

```
npx sls deploy -v

npx sls deploy function -f "userSignUpTrigger"
```

# Delete old lambda functions version

```
npx sls prune -n 10
```

# Step to run with Docker

```
1. docker build -t backend-node-app .

2. docker run -p 3000:3000 -d backend-node-app
```

# Step to run without Docker

```
npm start
```

# Migrations steps

https://sequelize.org/master/manual/migrations.html

```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

Create Manual migration file

npx sequelize-cli migration:create --name "xyz"
```

### Run Migration

```
npx sequelize-cli db:migrate

npx sequelize-cli db:migrate --env "production"

npx sequelize-cli db:migrate:undo --name filename.js
```

### Create seed file

```
npx sequelize-cli seed:generate --name user
```

### Add Seed data

```
npx sequelize-cli db:seed:all

npx sequelize-cli db:seed:all --env "production"

npx sequelize-cli db:seed --env "production" --seed 20210102145910-user

npx sequelize-cli db:seed --seed all-data.js
```

### User API

#### All User

```
query {
    users {
        email
        user_type
    }
}
```

### Get User by Id

```
query {
    userById(id:1) {
        email
        user_type
    }
}
```

#### Create User

```
mutation {
    createUser(user_type: "Contractor", email: "admin@gmail.com", created_by: 1) {
        email
        user_type
    }
}
```

#### Update User

```
mutation {
    updateUser(id: 2, user_type: "Admin", email: "contractor@gmail.com",  updated_by: 2) {
        email
        user_type
    }
}
```

#### Delete User

```
mutation {
    deleteUser(id:40)
}
```

#### Create Contractor

```
mutation {
    createContractor(fk_user_id:1, first_name: "bhavin", last_name: "nakrani", mobile: "9898989898", company_name: "Google", created_by: 1) {
        first_name
        last_name
    }
}
```
