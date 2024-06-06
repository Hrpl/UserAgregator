import axios from "axios";


export async function getUsersAPI(){
  const users = []     
  await axios.get("http://localhost:5209/api/Users")
    .then(res => {
      res.data.forEach(element => {
        users.push(element)
      });
    })
  return users
}

export async function deleteUserAPI(id){
  await axios.delete(`http://localhost:5209/api/Users?id=${id}`).then(resp => {
    if(resp.status == 200){
      alert("Пользователь удален");
      
    }
    else{
      alert("Error");
      
    }
  })
}

export async function updateUserAPI(user){
  axios.put('http://localhost:5209/api/Users',{
        id: user.id,
        surname: user.surname,
        name: user.name,
        patron: user.patron,
        photo: user.photo,
        birthday: user.birthday,
        phone: user.phone,
        email: user.email,
        male: user.male
      })
      .then((resp) => {
        if(resp.status == 200){
          alert("Пользователь обновлен");
        }
        else{
          alert("Ошибка обновления пользователя");
        }
      })
}

export async function addUserAPI(user){
  axios.post('http://localhost:5209/api/Users',{
    surname: user.surname,
    name: user.name,
    patron: user.patron,
    photo: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
    birthday: user.birthday,
    phone: user.phone,
    email: user.email,
    male: user.male
  })
    .then((resp) => {
      if(resp.status == 200){
        alert("Пользователь добавлен")
      }
      else {
        alert("Произошла ошибка во время добавления пользователя")
      }
  })
  .catch((error) => console.log(error))
}