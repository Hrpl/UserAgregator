
export function sortData(users, oreders){
    if(oreders == 'asc'){
       users.sort((a, b) => new Date(a.birthday) - new Date(b.birthday))
    }
    else if(oreders == 'desc'){
        users.sort((a, b) => new Date(b.birthday)  - new Date(a.birthday))
    }
    return users
}

export function filterData(users, sort){
    
    if(sort == "м"){
        users = users.filter((u) => u.male == "м")
    }
    else if(sort == "ж"){
        users = users.filter((u) => u.male == "ж")
    }
    return users
}