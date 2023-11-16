console.log("working")
const id = window.location.pathname.split("/").pop()

fetch(`/upload/${id}`)
.then(res => res.json())
.then(res => {
  document.querySelector("textarea").value = res.file.data
})
const editInspiration = () => {
  const inspiration = document.querySelector("textarea").value
  fetch(`/upload/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: inspiration
     })
  })
  .then(res => res.json())
  .then(res => {
    alert("Successfully updated.")
    window.location.href = "/"
  })
}