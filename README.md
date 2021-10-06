# Foodie API Documentation

### Uploading images
```
Maximum size: 2mb
Mimetypes: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif',]
```

### Create a user
```
POST /user
Form enctype: multipart/form-data
```

```json
// request body
{
  "name": "John",
  "username": "userjohn",
  "email": "userjohn@gmail.com",
  "password": "johnspass",
  "gender": 1,
  "profile-photo": "file"
}
// Gender: 0 for woman, 1 for man and 2 for others
```

```json
// response body, status: 201
```

```json
// response body, status: 422
{
  "message": "error message"
}
```
