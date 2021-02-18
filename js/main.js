// $.get("http://awiclass.monoame.com/api/command.php?type=get&name=scene_door.svg",
//     function (res) {
//      console.log(res);   
// },'text');





// var weight = 43;
// var height = 160;
// var total = weight + height;
// document.getElementById("demo1").textContent = weight;
// document.getElementById("demo2").textContent = height;
// document.getElementById("demo3").textContent = total;





// var test = 90;
// alert(test);
// test = 70;
// alert(test);
// test = "hi";
// console.log(test);





// var cookiePrice = 35;
// var myMoney = 10;
// var allTotal = cookiePrice - myMoney;
// var fiveCookie = cookiePrice * 5;
// // alert(cookiePrice - myMoney);
// document.getElementById("cookiePriceId").textContent = cookiePrice;
// document.getElementById("myMoneyId").textContent = myMoney;
// document.getElementById("totalId").textContent = allTotal;
// document.getElementById("fiveId").textContent = fiveCookie;





// function hamPrice(num){
//     var price = 60;
//     var hamTotal = num * price;
//     return hamTotal;
// }
// var sum = hamPrice(80)
// alert(sum);





// var farmer = 'Yooni';
// var dogs = ['Tree', 'Wu']
// var chick = 15;
// var cornField = [8, 5, 6];
// var broccolifield = [6, 6, 6, 6];
// var scarecrow = 9;





//陣列
// var cornField = [8, 5, 6];
// var cornField = [];
// cornField.push(5);
// cornField.push(6);
// cornField.push(7);
// cornField[0] = 10; //從陣列裡面改值
// cornField[3] = 17; //也可以以這種方式新增陣列的值
// console.log(cornField);
// console.log('我總共有' + cornField.length +'個玉米田'); //撈陣列有幾個

// var greet = [];
// greet.push(0);
// greet[1] = 1;
// console.log(greet);





//物件寫法
var farm = {
    farmer: 'Yooni', //farmer(屬性 property)  Yooni(值 value)
    dogs: ['Tree', 'Wu'],
    duck: 2,
    cornField: [8, 5, 6],
    broccolifield: [6, 6, 6, 6],
    scarecrow: 9,
    goDinner: function(){
        console.log(farm.farmer + '吃晚飯了!')
    },
    poultryTotal: function(){
        var num = farm.click + farm.duck;
        console.log('我的農場有' + num + '隻家禽');
    }
}
farm.click = 15; //新增物件
var dog1 = farm.dogs[0]; 
console.log(farm.dogs[0]); //物件顯示方式
console.log('我農場第一隻狗叫' + dog1); //物件顯示方式
console.log('我農場第二隻狗叫' + farm.dogs[1]); //物件顯示方式
farm.goDinner(); //function物件呼叫方式
farm.poultryTotal(); //function物件呼叫方式





//物件+陣列設計流程
var farms = [
    {
        myMom: 'Su',
        dogs: ['Tree', 'Wu'],
        duck: 2,
        cornField: [8, 5, 6],
        broccolifield: [6, 6, 6, 6],
        scarecrow: 9,
        
    },
    {
        myDad: 'Hou',
        dogs: ['Weng', 'Irene'],
        duck: 5,
        cornField: [3, 9, 2],
        broccolifield: [5, 5, 5, 5],
        scarecrow: 8,
    }
]
console.log(farms[0].myMom); //物件+陣列顯示方式
console.log(farms[1].dogs[1]); //物件+陣列顯示方式






// if(hungry <= 3) {
//     eat('Pizza');
// } else if (hungry <= 7 && hungry > 3) {
//     eat('沙拉');
// }







// 比較運算子
// == (等於)
// !== (不等於)




// 比較運算子：==、!==，程式碼範例
var myMonth = 5;
var thisMonth = 12;
var birthdayCheck = myMonth == thisMonth;
console.log(birthdayCheck);
document.getElementById('birthdayId').textContent = birthdayCheck;

var nowPeople = 1;
var totalPeople = 2;
var allPeopleNoHereCheck = totalPeople !== nowPeople;
console.log(allPeopleNoHereCheck);
document.getElementById('peopleId').textContent = allPeopleNoHereCheck;






// 邏輯運算子： &&、||、!
var isId = true; //我自身條件
var isIn =  false; //我自身條件
var isPaper = true; //我自身條件
isId == true && isIn == true && isPaper == true; //規則條件



var billFull = 1200; //我自身條件
var isVIP = false; //我自身條件
billFull > 1000 || isVIP == true; //規則條件
// isVIP == ture;


var myShopping = 1800;
var isVip = false;
var upVVip = myShopping >= 1500 || isVip == true;
console.log(upVVip)






//邏輯運算子：範例程式碼
var myBill = 1250;
var VIP = false;
var andCheck = myBill > 1000 && VIP == true;
var orCheck = myBill > 1000 || VIP == true;
if (andCheck == false) {
    andCheck = 'sorry,我沒有';
} else {
    andCheck = '我有';
};

if (orCheck == false) {
    orCheck = 'sorry,我沒有';
} else {
    orCheck = '我有';
};
document.getElementById('andId').textContent = andCheck;
document.getElementById('orId').textContent = orCheck;





//if - 程式碼
// var hungry = '飽欸'
// if (hungry == '飢餓') {
//     console.log('我真的很餓!');
// } else {
//     console.log('我不餓啦!');
// };




var hungry = 9; //飢餓程度 1~10
function eat(food){
    console.log('我現在要吃' + food);
}
if (hungry <= 3){
    eat('Pizza');
} else if (hungry <= 5 && hungry > 3){
    eat('沙拉');
} else if (hungry == 6) {
    eat('cookie')
} else {
    console.log('我很飽了啦!')
}




//switch - 程式碼
var light = 'blue'; //已經確定是哪個狀態了
function lightFun(str){
    console.log('目前是' + str + '警戒');
}
switch(light){
    case 'red':
        alert('紅色警戒');
        alert('快跑啊');
        break;
    case 'blue':
        lightFun(light)
        break;
    default:
        alert('沒有任何資料');
        break;        
}




//for 寫法
for(var i = 0; i < 3; i++){
    console.log(i);
}


for(var i = 1; i < 10; i++){
    console.log(i + '*' + i + '=' + i*i);
}





//自己寫99乘法表 (利用陣列寫法)
function myNum1(){
    var str = [];
    for (var i = 1;i<=9; i++){
        str.push(i);
    };
    var total9Num = '';
    for(k = str[0]; k <= str.length; k++){
        for (var j = 1; j<=9; j++){
            total9Num +=  ( k + "*" + j + " = " + k * j + " ");
        }
        total9Num += " ";
    }
    console.log(total9Num);
}
myNum1();







//for-array 寫法
var farms = [
    {
        farmer: '卡伯斯',
        field: 6,
    },
    {
        farmer: '艾莉',
        field: 10,
    },
]
var farmsTotal = farms.length;
for(var i = 0; i < farmsTotal ; i++){
    console.log('第' + (i + 1) + '個農場主人是' + farms[i].farmer);
}





//for if 寫法
var farm = [
    {
        farmer: '賈伯斯',
        field: 5,
        dogs: 1,
    },
    {
        farmer: '安迪',
        field: 7,
        dogs: 78,
    },
    {
        farmer: '娜娜',
        field: 9,
        dogs: 121,
    }
]
var farmTotal = farm.length;
for(var i = 0; i < farmTotal; i++){
    // console.log(farm[i].dogs);
    if(farm[i].dogs > 100){
        console.log('第' + (i + 1) + '的主人' + farm[i].farmer + '農場的狗超過100隻了');
    } else {
        console.log('第' + (i + 1) + '的主人' + farm[i].farmer + '農場的狗不足數量');
    }
}





//for - i++ 寫法
var i = 0
i++;
i += 1;
console.log(i)








//for - 加總
var farm = [
    {
        farmer: '賈伯斯',
        field: 5,
        dogs: 1,
        apple: 1350,
    },
    {
        farmer: '安迪',
        field: 7,
        dogs: 78,
        apple: 493,
    },
    {
        farmer: '娜娜',
        field: 9,
        dogs: 121,
        apple: 579,
    }
]
var appleLength = farm.length;
var appleTotal = 0;
for(var i = 0; i < appleLength ; i++){
    appleTotal += farm[i].apple;
}
console.log('今年蘋果採收量是：' + appleTotal);





//for 與 break 運用
var farm = [
    {
        farmer: '賈伯斯',
        field: 5,
        dogs: 1,
        apple: 493,
    },
    {
        farmer: '安迪',
        field: 7,
        dogs: 78,
        apple: 1578,
    },
    {
        farmer: '娜娜',
        field: 9,
        dogs: 121,
        apple: 579,
    }
]
var appleLength = farm.length;
for(var i = 0; i < appleLength ; i++){
  if(farm[i].apple > 1000){
    console.log('第' + (i + 1) + '農場足夠我買1000顆蘋果');
    farm[i].apple -= 200;
    console.log('第' + (i + 1) + '農場的蘋果我買完之後剩下' + farm[i].apple)
    break;
  }
}
console.log(farm[1].apple);









//JOSN
var data = [{
    "company": "皇冠大車隊高雄分公司",
    "charge": "依車款、尖離峰彈性倍率收費(1.2倍、1.4倍、1.6倍、1.8倍、2倍)"
 },
 {
    "company": "中華大車隊",
    "charge": "依車款、尖離峰彈性倍率收費(1.2倍、1.4倍、1.6倍、1.8倍、2倍)"
 },
 {
    "company": "倫永大車隊",
    "charge": "依現行運價收費"
 },
 {
    "company": "好客來車隊",
    "charge": "依車款彈性倍率收費(1.2倍、1.6倍、2倍)"
 },
 {
    "company": "興旺計程車車隊",
    "charge": "1.經濟型：一般費率×1.1倍、2.豪華型：一般費率×1.3倍、3.尊爵型：一般費率×1.6倍"
 },
 {
    "company": "伍福計程車車隊",
    "charge": "依尖離峰時段以一般計程車費率加收附加費"
 },
 {
    "company": "台灣大車隊高雄分公司",
    "charge": "依車款、尖離峰彈性倍率收費"
 },
 {
    "company": "大發計程車車隊",
    "charge": "比照一般計程車費率"
 },
 {
    "company": "新形象計程車車隊",
    "charge": "依尖離峰時段以一般計程車費率加收附加費"
 },
 {
    "company": "澄清湖計程車車隊",
    "charge": "初期依一般計程車費率"
 },
 {
    "company": "群富計程車車隊",
    "charge": "依車款、尖離峰及假日彈性倍率收費"
 }
]
console.log(data.length);

var total = data.length;
var matchText = '依車款'
for(var i = 0; i < total; i++){
    if(data[i].charge.match(matchText)) {
        console.log('依照車款的車隊有:' + data[i].company + ' ' + '詳細收費條件為:' + data[i].charge);
    }
}





//querySelector - 選擇單一元素
// var el = document.getElementById('demo123');
// el.TextContent = '1234';

var el = document.querySelector('.titelClass em')
el.textContent = '0987';






//querySelectorAll - 可重複選取多個元素
//querySelectorAll (選取出來的元素會是是陣列 [em, em] 所以要用迴圈去帶入每一項的值)
var qu = document.querySelectorAll('.quClass em');
var quLen = qu.length;
for(var i = 0; i < quLen; i++){
    qu[i].textContent = i + '567';
}





//setAttribute - 增加標籤屬性
var el = document.querySelector('.titleClass a');
el.setAttribute('href','https://www.youtube.com/');

var el1 = document.querySelector('.titleClass a').getAttribute('href');
console.log(el1)//取出值作法getAttribute

var el1_1 = document.querySelector('.titleClass a').textContent;
console.log(el1_1)//取出內文作法textContent/innnerHTML

var el2 = document.querySelector('.str');
el2.setAttribute('id', 'strId');







//innerHTML (上)
//innerHTML 會把東西(內容)清空 在塞新的東西
var mainel = document.getElementById('main');
main.innerHTML = '<h1 class="blue"> innerHTML (上) </h1>'


var mainel = document.getElementById('main');
var str = '<h1 class="blue"> innerHTML (上) </h1>';
main.innerHTML = str + '<br>' + str;



//innerHTML (下)
var el4 = document.querySelector('.list');
var link = "http://yahoo.com.tw";
var name = "查理"
el4.innerHTML = '<li><a href="'+ link +'">'+ name +'</a></li>';




//innerHTML 與 for 運用
var farms = [
    {
        farmer: 'Momo',
        dogs: ['嘟嘟', '球球'],
    },
    {
        farmer: 'Jemmy',
        dogs: ['Napi'],
    }
];
var el5 = document.querySelector('.list2');
var farmLen = farms.length;
var stm = '';
for(var i = 0; i < farmLen; i++) {
    var content = '<li>' + farms[i].farmer + '</li>';
    stm += content; //必須加上空字串回傳第一個 之後在加上會傳的第二個 不然innerHTML 第二回傳會取代第一個會直接取代
}
el5.innerHTML = stm;




//createElement 寫法 
//(並不會取代原本的元素，是以新增的方式加上)
var sto = document.createElement('em');
sto.textContent = 'createElement 寫法';
sto.setAttribute('class', 'blue');
document.querySelector('.h6Title').appendChild(sto);







//createElement 與 for 運用
var farms = [
    {
        farmer: 'Momo',
        dogs: ['嘟嘟', '球球'],
    },
    {
        farmer: 'Jemmy',
        dogs: ['Napi'],
    }
];
var el6 = document.querySelector('.list3');
var farmLens = farms.length;
for(var i = 0; i < farmLens; i++){
    var str = document.createElement('li');
    str.textContent = farms[i].farmer;
    el6.appendChild(str);
}





document.getElementById('send').onclick = 
function(){
    var stn = document.getElementById('content').value;
    document.getElementById('mainText').textContent = stn;
    
}

// document.getElementById('send').onclick;
function submitText(){
    var stn = document.getElementById('content').value;
    document.getElementById('mainText').textContent = stn;
    
}






//event 物件 - 告知你當下元素資訊
var el8 = document.querySelector('.btn');
el8.onclick = function(e){
    console.log(e);
}






//觀念篇 - 各種事件綁定的差異
var btn = document.querySelector(".btn2");
btn.onclick = function(){
    alert('hello');
}

btn.addEventListener('click', function(){
    alert('hello2');
},false)





//addEventListener - 事件監聽
var ml =  document.querySelector('.btn3');
ml.addEventListener('click',function(e){
    //選擇事件, 帶入匿名function, false
    alert('hello3');
},false)







// //綁定事件的語法差異
//             //onclick 疊加onclick 最後一個會取代前面的
var elon = document.querySelector('.btnOn');
elon.onclick = function(){
    alert('on-1')
}
elon.onclick = function(){
    alert('on-2')
}
//             //addEventListener 會疊加click 不會被取代會執行設定次數
var eladd = document.querySelector('.btnAdd');
eladd.addEventListener('click',function(){
    alert('add02')
},false)
eladd.addEventListener('click',function(){
    alert('add03')
},false)






// // //Event Bubbling、Event Capturing 差異
// var eln = document.querySelector('.box');
// eln.addEventListener('click',function(){
//     alert('box');
// },true); 

// var elnBody = document.querySelector('.body');
// elnBody.addEventListener('click',function(){
//     alert('body');
// },true);
// //             //false(事件氣泡 Event Bubbling) - 從指定元素往外找 
// //             //true(事件捕捉 Event Capturing) - 從最外面找到指定元素
// //             //也可以都不寫 預設false





// // //stopPropagation - 中止冒泡事件           
// var eln = document.querySelector('.box');
// eln.addEventListener('click',function(e){ //<----必須寫e
//     e.stopPropagation();  //<-----stopPropagation() 點擊後終止在此處不會再往外找
//     alert('box');
// },false); 

// var elnBody = document.querySelector('.body');
// elnBody.addEventListener('click',function(){
//     alert('body');
// },false);







// //preventDefault - 取消預設觸發行為
// var linka = document.querySelector('.link');
// linka.addEventListener('click',function(e){
//     e.preventDefault();
//     //取消元素的默認行為
//     //原本會跳轉到連結網址
//     //submit 按鈕，先透過我的ＪＳ去查詢表單有無錯誤，ＰＯＳＴ去傳送
// },false)





// //e.target - 了解目前所在元素位置
// // var mlo = document.querySelector('.header');
// // mlo.addEventListener('click',function(e){
// //     console.log(e.target);
// // },false);

// var mlo = document.querySelector('.header');
// mlo.addEventListener('click',function(e){
//     console.log(e.target.nodeName);
// },false);





//change - 表單內容更動內容時觸發
var area = document.querySelector('#areaId');
var list = document.querySelector('.listUl');
var country = [
    {
        farmer: '查理',
        place: '前鎮區',
    },
    {
        farmer: '卡伯斯',
        place: '苓雅區',
    },
    {
        farmer: '小花',
        place: '苓雅區'
    }
]






var leng = country.length;
function updateList(e){
    var select = e.target.value;
    var str = '';
    for(var i = 0; i < leng; i++){
        if(select == country[i].place){
            str += '<li>' + country[i].farmer + '</li>'
        }
    }
    list.innerHTML = str;
}
area.addEventListener('change',updateList,false);







//mouse - 當滑鼠滑入指定內容時觸發
var elo = document.querySelector('.box01');
elo.addEventListener('mousemove',function(){
    alert('1234')
},false)

var el = document.querySelectorAll('.box');
var Len = el.length;
for(var i = 0; i < Len; i++){
    el[i].addEventListener('mousemove',function(e){
        alert('你輸了！');
    },false);
}









//事件監聽優化篇 - 從父元素來監聽子元素內容
var list = document.querySelector('.list');
list.addEventListener('click',checkName,false);
function checkName(e){
    if(e.target.nodeName !== 'LI'){return};
    console.log(e.target.textContent);
}





// setItem、getItem 基本操作
// var str = 'tom';
// localStorage.setItem('myName',str);

// console.log(localStorage.getItem('myName'));

var btn = document.querySelector('.btnClass');
var call = document.querySelector('.btnCall');
function saveName(e){
    var str = document.querySelector('.textClass').value;
    localStorage.setItem('myName',str);
}
btn.addEventListener('click',saveName,false);
call.addEventListener('click',function(){
    var str = localStorage.getItem('myName');
    alert('你的名子是' + str);
},false);




///localStorage只能儲存字串資料 string







//透過 JSON.parse、JSON.stringify 來編譯資料
//JSON.stringify 把array資料字串化
var country = [
    {farmer: '卡伯斯'}
];
var countryString = JSON.stringify(country)
console.log(countryString);
localStorage.setItem('countryItem', countryString);
var getData = localStorage.getItem('countryItem');
var getDataAry = JSON.parse(getData);
console.log(getDataAry[0].farmer);


var myHome = [    //<---------練習
    {
        mom: 'su',
        dad: 'hou',
        me: 'ning'
    }
]
var myHomeString = JSON.stringify(myHome);
localStorage.setItem('myHomeName',myHomeString);
var getmyHome = localStorage.getItem('myHomeName');
var myHomeAry = JSON.parse(getmyHome);
console.log(myHomeAry[0].dad);





//data-* - 透過 dataset 讀取自訂資料
// var data4 = document.querySelector('.list4 li').dataset.dog;
// console.log(data4);

var data4 = document.querySelector('.list4');
function checksList(e){
    var num = e.target.dataset.num;
    var dog = e.target.dataset.dog;
    console.log('農夫的編號是' + num);
    console.log('有' + dog + '隻狗');
}
data4.addEventListener('click',checksList,false)
