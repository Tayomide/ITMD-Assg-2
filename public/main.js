console.log("hello")
const textarea = document.querySelector("textarea")
const list = document.querySelector("ul")
getInspirations()
const addInspiration = () => {
  const inspiration = document.querySelector("textarea").value
  fetch("/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      type: "text",
      data: inspiration
     })
  })
  .then(res => res.json())
  .then(res => {
    alert("Successfully added.")
    textarea.value = ""
    getInspirations()
  })
  console.log(inspiration)
}

const deleteInspiration = (id) => {
  fetch(`/upload/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  })
  .then(res => res.json())
  .then(res => {
    alert("Successfully deleted.")
    getInspirations()
  })
}

function getInspirations () {
  fetch("/upload")
  .then(res => res.json())
  .then(res => {
    console.log(res)
    list.innerHTML = ""
    for(const file of res.files) {
      list.innerHTML += `
        <li>
          <p onclick="edit('${file._id}')">${file.data}</p>
          <button class="delete" onclick="deleteInspiration('${file._id}')">
            <img src="garbage-svgrepo-com.svg" alt="SVG Image">
          </button>
        </li>
      `
    }
  })
}

function edit(id) {
  window.location.href = `/edit/${id}`
}