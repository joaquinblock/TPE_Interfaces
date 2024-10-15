let stars = document.querySelectorAll(".star")
let lastStarClicked = ''

stars.forEach(s => {
    s.addEventListener("click", setRating)
})

function setRating(e) {
    if (localStorage.getItem("session")) {
        stars.forEach(s => {
            s.src = "../iconos/logo_estrella_vacia.svg"
        })
    
        if (lastStarClicked != e.target.id) {
            let n = e.target.id.split("-")[1]

            lastStarClicked = e.target.id
        
            for (let i = 0; i < n; i++) {
                stars[i].src = "../iconos/logo_estrella_llena.svg"
            }
        } else {
            lastStarClicked = ''
        }

    } else {
        document.body.classList.add('blur')
        signin_form.classList.remove('invisible')
        signin_form.classList.add('visible')
        profile_menu.classList.remove('visible')
        profile_menu.classList.add('invisible')
    }
}