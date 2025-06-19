fetch("data.json")
  .then(res => res.json())
  .then(data => {
    let tai = 0, xiu = 0, streak = 1;
    let last = null;
    const tbody = document.querySelector("tbody");

    data.reverse().forEach((item, i) => {
      const sum = item.dice.reduce((a, b) => a + b, 0);
      const result = sum >= 11 ? "Tài" : "Xỉu";
      if (result === "Tài") tai++;
      else xiu++;

      if (i > 0 && result === last) streak++;
      else streak = 1;

      last = result;

      const row = `<tr>
        <td>${item.round}</td>
        <td>${item.dice.join("-")}</td>
        <td>${sum}</td>
        <td>${result}</td>
      </tr>`;
      tbody.innerHTML += row;
    });

    document.getElementById("taiCount").textContent = tai;
    document.getElementById("xiuCount").textContent = xiu;
    document.getElementById("streak").textContent = streak;

    const prediction = (last === "Tài" && streak >= 3) ? "Xỉu" :
                       (last === "Xỉu" && streak >= 3) ? "Tài" : "Đang phân tích...";

    document.getElementById("prediction").textContent = prediction;
  });
