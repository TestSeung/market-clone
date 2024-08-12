const form = document.getElementById("write-form");

const handleSubmitForm = async (event) => {
  event.preventDefault(); // 자동새로고침방지
  await fetch("/items", {
    method: "POST",
    body: new FormData(form),
  });
  console.log("제출완료");
};

form.addEventListener("submit", handleSubmitForm);
