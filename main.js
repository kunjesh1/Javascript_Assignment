
var result=
{
    "most_active":{
        "attacker_king":"",
        "defender_king":"",
        'region':"",
        'name':""


    },
    "attacker_outcome":{'win':"",'loss':""},
    "battle_type": [],
     "defender_size":{
     
        'average':"",
    'min':"",
    'max':""

     }

    }








var btn = document.getElementById("btn");

btn.addEventListener("click", function () {



    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://kunjesh1.github.io/assignment/battles.json');
    ourRequest.onload = function () {
        var data = JSON.parse(ourRequest.responseText);
       

        result.most_active.attacker_king=calculate_most_frequent(data.map((d) => d.attacker_king));
        result.most_active.defender_king=calculate_most_frequent(data.map((d) => d.defender_king));
        result.most_active.region=calculate_most_frequent(data.map((d) => d.region));
        result.most_active.name=calculate_most_frequent(data.map((d) => d.name));
        outcome_output(data);
        result.battle_type = [...new Set(data.filter(d => d.battle_type !== "").map(d => d.battle_type))];
      
        
        calculate_size(data.filter(d=>d.defender_size!==null).map(d=>d.defender_size));
    
        

    };

    ourRequest.send();


});




 function calculate_size(data) {


    result.defender_size.average=data.reduce((d,total)=>total+d,0)/data.length;

    result.defender_size.min=Math.min.apply(null,data);

    result.defender_size.max=Math.max.apply(null,data);
    


 }




function calculate_most_frequent(data) {

    let counts = data.reduce((a, c) => {
        a[c] = (a[c] || 0) + 1;
        return a;
    }, {});
    let maxCount = Math.max(...Object.values(counts));
    let mostFrequent = Object.keys(counts).filter(k => counts[k] === maxCount);
    //console.log(mostFrequent);
    return mostFrequent;
}


function outcome_output(data) {

    result.attacker_outcome.win = data.filter((d) => d.attacker_outcome === "win").length;
    result.attacker_outcome.loss = data.filter((d) => d.attacker_outcome === "loss").length;
   
}






function renderData() {
 

    var htmlString=result;
    animal-info.insertAdjacentHTML('beforeend',result)
   // console.log(val);

    return val;
}

console.log(result);