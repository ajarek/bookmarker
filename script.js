const inputName = document.querySelector('#nameSite')
const inputUrl = document.querySelector('#urlSite')
const btn = document.querySelector('.btn')
const container = document.querySelector('.my-4')
const alertUrl = document.querySelector('.alert')
const alertLength = document.querySelector('#alertLength')

arr = []
let flag = false
let flagLength = false

//Reading from storage<---------------------------->
const display = () => {
  container.innerHTML = ''
  localStorageData = JSON.parse(localStorage.getItem('data'))
  if (localStorageData === null) {
    data = []
  } else {
    for (i = 0; i < localStorageData.length; i++) {
      container.innerHTML += `<ul class="list-group ">
          <li class="list-group-item my-2   ">
            <span >${localStorageData[i].Name}</span>
            <div class="btn-group  " role="group" aria-label="Basic mixed styles example">
              <button type="button" class="btn btn-success mx-2 " onclick="vist()"data-id='${localStorageData[i].Url}' id='vist'>Visit</button>
              <button type="button" class="btn btn-danger" onclick='deleteUrl(name)'>Delete</button>
            </div>
          </li>`
    }
  }
}
display()

//Save to storage<---------------------------->
const saveStorage = () => {
  const localStorageData = localStorage.getItem('data')
  let data
  if (localStorageData === null) {
    data = []
  } else {
    data = JSON.parse(localStorageData)
  }
  const newData = {
    Name: inputName.value,
    Url: inputUrl.value
  }
  data.push(newData)
  localStorage.setItem('data', JSON.stringify(data))
}
//<--------------------------------------------------------------->

const vist = () => {
  const vist = document.querySelectorAll('#vist')
  vist.forEach(el => el.addEventListener('click', (e) => {
    localStorageData = JSON.parse(localStorage.getItem('data'))
    for (i = 0; i < localStorageData.length; i++) {
      if (e.target.dataset.id === localStorageData[i].Url) {
        window.open('https://' + localStorageData[i].Url, '_blank')
      }
    }
  }))
}

const validateEmpty = () => {
  if (inputName.value !== '' && inputUrl.value === '') {
    inputName.style.borderColor = 'green'
    inputUrl.style.borderColor = 'red'

  }
  if (inputName.value === '' && inputUrl.value !== '') {
    inputName.style.borderColor = 'red'
    inputUrl.style.borderColor = 'green'

  }
  if (inputName.value !== '' && inputUrl.value !== '') {
    inputName.style.borderColor = 'green'
    inputUrl.style.borderColor = 'green'
    flag = true
  }
  if (inputName.value === '' && inputUrl.value === '') {
    inputName.style.borderColor = 'red'
    inputUrl.style.borderColor = 'red'
  }
}

const validateUrl = () => {
  if (flag === true && flagLength === true && /^www.\w./.test(inputUrl.value)) {
    alertUrl.style.display = 'none'
    saveStorage()
    display()
  }
  if (flag === true && !/^www.\w./.test(inputUrl.value)) {
    alertUrl.style.display = 'block'
  }
}

const validateLength = () => {
  if (inputName.value.length < 40 && inputUrl.value.length < 40) {
    alertLength.style.display = 'none'
    flagLength = true
  } else {
    alertLength.style.display = 'block'
  }
}

btn.addEventListener('click', (e) => {
  e.preventDefault()
  validateLength()
  validateEmpty()
  validateUrl()
})

// <----------Delete data in LocalStorage------------------------------------>
const deleteUrl = (name) => {

  const spans = document.querySelectorAll('span')

  spans.forEach(ele => {
    name = ele.textContent
  })

  let dataLocalStorage = JSON.parse(localStorage.getItem('data'))

  dataLocalStorage.forEach(function (data, index) {
    if (data.Name === name) {
      dataLocalStorage.splice(index, 1)
    }
  })

  localStorage.setItem('data', JSON.stringify(dataLocalStorage))

  display()
}
//<--------------------------------------------------------------->