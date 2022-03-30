const app = new Vue({
    el: "#app",
    data() {
        return {
            // 途中式はリスト形式でここで管理する
            expressionList : [],
            tmpInt : "",
            tmpAns : 0,
            tmpOp1 : 0,
            tmpOperator : "+",
            answer : "",
        };
    },
    computed: {
        // 途中式を文字列にしてinput form に渡す
        expressionText: function(){
            let res = "";
            for(let i=0; i<this.expressionList.length; i++){
                res += String(this.expressionList[i]);
            }
            return res;
        }
    },
    methods: {
        intButtonPushed: function(value){
            // console.log(typeof(value));
            this.expressionList.push(value);
            this.tmpInt += String(value);
            console.log(typeof(value))
        },
        operatorButtonPushed: function(value){
            // 演算子は連続では入力できない
            if(typeof(this.expressionList[this.expressionList.length-1]) === "string"){
                return;
            }
            // 演算子が押された時点で都度暫定的な答えを出す
            // tmpIntをint型に変換, tmpInt初期化
            let op2 = Number(this.tmpInt);
            this.tmpInt = "";
            this.tmpAns = fourArithmetic(this.tmpOp1, op2, this.tmpOperator);
            console.log("tmp Answer is: " + this.tmpAns);

            // 次の計算のためにtmpOp1（左辺）に暫定的な答えを代入しておく
            this.tmpOp1 = this.tmpAns;
            this.tmpOperator = value;

            this.expressionList.push(" " + value + " ");
        },
        caluculate: function(){
            // 最後が数字ならもう一度計算
            if(this.tmpInt.length > 0){
                console.log("末尾のデータ型:" + typeof(this.expressionList[this.expressionList.length - 1]));
                console.log("末尾は数字");
                // tmpIntをint型に変換, tmpInt初期化
                let op2 = Number(this.tmpInt);
                this.tmpAns = fourArithmetic(this.tmpOp1, op2, this.tmpOperator);
                console.log("tmp Answer is: " + this.tmpAns);
            }
            this.answer = this.tmpAns;
            console.log("Final answer is: " + this.answer);

            // 他の条件を初期化
            this.expressionList = [];
            this.tmpInt = "";
            this.tmpAns = 0;
            this.tmpOp1 = 0;
            this.tmpOperator = "+";
        },
    }
})

function fourArithmetic(op1, op2, operator){
    switch(operator){
        case "+":
            return op1 + op2;
        case "-":
            return op1 - op2;
        case "*":
            return op1 * op2;
        case "/":
            return op1 / op2;
    }
}