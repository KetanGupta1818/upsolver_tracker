const tableDOM = document.getElementById("problems-table");

const loadProblems = async () => {
    try {
        const contests = await axios.get('/api/v1/problems');
        contests.data.forEach(contest => {
            const row = document.createElement("tr");
            const col1 = document.createElement("td");
            col1.innerHTML = `<p>${contest.contestId}   div ${contest.problems[0].div}</p>`;
            const col2 = document.createElement("td");
            col2.className = "ui grid";
            const horizontal_line = document.createElement("hr");
            horizontal_line.style.backgroundColor = "black";
            contest.problems.forEach((prob) => {
                const cur_div = document.createElement("div");
                cur_div.className = "two wide column";
                const link = document.createElement("a");
                link.href = `https://codeforces.com/problemset/problem/${prob.contestId}/${prob.index}`;
                link.text = `${prob.contestId}${prob.index} `;
                cur_div.appendChild(link);
                if(prob.rating){
                    const rating_div = document.createElement("div");
                    rating_div.style.bottom = "0";
                    rating_div.style.right = "0";
                    rating_div.innerHTML = `${prob.rating}`;
                    rating_div.style.fontSize = "0.8em";
                    cur_div.appendChild(rating_div);
                }
                
                col2.appendChild(cur_div);
            })
            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(horizontal_line);
            tableDOM.appendChild(row);
        });
      } catch (error) {
        console.log("eeoorrr" ,error);
      }
}
//loadProblems().then(()=>console.log("loaded")).catch((er)=>console.log(er));