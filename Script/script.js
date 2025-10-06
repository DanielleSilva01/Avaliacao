(function() {
  emailjs.init("bMa2teX0GFq6ZsxLa");

  const form = document.getElementById("form-contato");
  const statusMsg = document.getElementById("status-msg");
  const simularErroCheckbox = document.getElementById("simular-erro");
  let statusTimeout = null;

  function showStatus(text, color) {
    clearTimeout(statusTimeout);
    statusMsg.style.color = color;
    statusMsg.textContent = text;
    statusTimeout = setTimeout(() => {
      statusMsg.textContent = "";
    }, 5000);
  }

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const assunto = document.getElementById("assunto").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !email || !assunto || !mensagem) {
      showStatus("Por favor, preencha todos os campos.", "red");
      return;
    }

    if (simularErroCheckbox && simularErroCheckbox.checked) {
      Promise.reject(new Error("Simulação de erro"))
        .catch(function(error) {
          console.error("Erro simulado:", error);
          showStatus("Ocorreu um erro ao enviar. Tente novamente.", "red");
        });
      return;
    }

    emailjs.send("service_6ujl89o", "template_t4rfhxb", {
      from_name: nome,
      from_email: email,
      subject: assunto,
      message: mensagem
    })
    .then(function() {
      showStatus("Mensagem enviada com sucesso!", "green");
      form.reset();
    }, function(error) {
      console.error("Erro:", error);
      showStatus("Ocorreu um erro ao enviar. Tente novamente.", "red");
    });
  });
})();
