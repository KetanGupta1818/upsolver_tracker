const axios = require('axios');

const getAllProblems = async (req,res) => {
    
    const raw_contests = await axios.get("https://codeforces.com/api/contest.list");
    const contests_array = raw_contests.data.result;
    const required_contests = contests_array.filter((contest) =>contest.phase === "FINISHED" && getDivision(contest.name).length > 0)
                .map((contest) => {
                    return {
                    id: contest.id,
                    div: getDivision(contest.name)
                }});
    const constestMap = new Map();
    required_contests.forEach(contest => {
        constestMap.set(contest.id,contest.div);
    });
    const raw_problem_set = await axios.get("https://codeforces.com/api/problemset.problems");
  //  console.log(raw_problem_set.data.result.problems[100].rating);
    const valid_problems = raw_problem_set.data.result.problems.filter((problem) => constestMap.has(problem.contestId));
    let contestToProblemsMap = new Map();
    valid_problems.forEach(prob => {
        let arr = new Array();
        if(contestToProblemsMap.has(prob.contestId)) arr = contestToProblemsMap.get(prob.contestId);
        arr.push({"contestId": prob.contestId,"index":prob.index,"rating": prob.rating,"div": constestMap.get(prob.contestId)});
        contestToProblemsMap.set(prob.contestId,arr);
    });
    let A = new Array();
    for(let [contestId,problems] of contestToProblemsMap.entries()){
        problems = problems.reverse();
        A.push({contestId, problems});
    }
    A.sort((a,b)=>b.contestId - a.contestId);
    res.send(A);
 //   res.send("k");
}

function getDivision(str){
 //   console.log(str);
    let div = "";
    str = str.replace(/\s+/g, '');
    for(let i=0;i<str.length - 3;i++){
        if(str.substring(i,i+3).toLowerCase() === "div"){
            div = div + "+" + str.substring(i+4,i+5);
        }
    }
    return div.substring(1);
}




/*

contest obj => 
  1. int id
  2. string division string
  3. obj[] problems //Sorted by difficulty




problem obj ->
   0. String id
   1. String problem number (A, B1, B2, C)   [index]
   2. Integer Difficulty
*/

















const userProblems = async (req,res) => {
    console.log(req.body);
    let user = req.body.codeforces_id;
    res.send("ok");
}



module.exports = {getAllProblems,userProblems};