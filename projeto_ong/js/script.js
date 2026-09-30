document.addEventListener("DOMContentLoaded", () => {
  const onlyDigits = value => value.replace(/\D/g, "");

  const masks = {
    cpf: (v) => {
      v = onlyDigits(v).slice(0,11);
      return v.replace(/(\d{3})(\d)/,"$1.$2")
              .replace(/(\d{3})(\d)/,"$1.$2")
              .replace(/(\d{3})(\d{1,2})$/,"$1-$2");
    },
    telefone: (v) => {
      v = onlyDigits(v).slice(0,11);
      if (v.length <= 10) return v.replace(/(\d{2})(\d)/,"($1) $2")
        .replace(/(\d{4})(\d)/,"$1-$2");
      return v.replace(/(\d{2})(\d)/,"($1) $2")
        .replace(/(\d{5})(\d)/,"$1-$2");
    },
    cep: (v) => {
      v = onlyDigits(v).slice(0,8);
      return v.replace(/(\d{5})(\d)/,"$1-$2");
    }
  };

  ["cpf","telefone","cep"].forEach(id => {
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener("input", () => el.value = masks[id](el.value));
  });

  const cpf = document.getElementById("cpf");
  if(cpf){
    cpf.addEventListener("input", () => {
      const valid = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf.value);
      cpf.setCustomValidity(cpf.value && !valid ? "Informe o CPF no formato 000.000.000-00." : "");
    });
  }

  const form = document.getElementById("cadastroForm");
  if(form){
    form.addEventListener("submit", (e) => {
      if(!form.checkValidity()){
        e.preventDefault();
        form.reportValidity();
      }
    });
  }
});