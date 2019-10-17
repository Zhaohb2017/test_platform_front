/**
 * 将"2018-05-19T08:04:52.000+0000"这种格式的时间转化为正常格式
 * @param time
 */
function timeFormat(time) {
    var d = new Date(time);

    var year = d.getFullYear();       //年
    var month = d.getMonth() + 1;     //月
    var day = d.getDate();            //日

    var hh = d.getHours();            //时
    var mm = d.getMinutes();          //分
    var ss = d.getSeconds();           //秒

    var clock = year + "/";

    if (month < 10)
        clock += "0";

    clock += month + "/";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    if (hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";

    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}
/**
 * 将"2018-05-19T08:04:52.000+0000"这种格式的时间转化年月
 * @param time
 */
function yearsFormat(time) {
    var d = new Date(time);

    var year = d.getFullYear();       //年
    var month = d.getMonth() + 1;     //月
    var day = d.getDate();            //日

    var hh = d.getHours();            //时
    var mm = d.getMinutes();          //分
    var ss = d.getSeconds();           //秒

    var clock = year + "/";

    if (month < 10)
        clock += "0";

    return (clock);
}

/**
 * 将玩法的创房选项数据转化成可读数据
 * @param time
 */
function roomDataFormat(carete_room_data) {
    // 引用本地config.json生成初始化變量
    const config = require('./config.json');
    var list_data = []
    var return_data = {};
    var data = eval(carete_room_data);
    for(var j in data){
        if (j in config) {
            if(data[j] != ""){
                var dict = {}
                dict["name"] = config[j]
                dict["value"] = data[j]
                list_data.push(dict)
                return_data[config[j]] = data[j]
            }
        }
    }
    return  list_data  //返回数组信息
    // return return_data;
}
/**
 * 用户mid转换
 * @param time
 */
function midFormat(mid) {

    var return_data = [];
    var data = eval(mid);
    for(var i in data){
        var dict = {}
        dict["name"] = "id"
        dict["value"] = data[i]
        return_data.push(dict)
    }
    return return_data



}

/**
 * 操作步骤转换
 * @param time
 */
function setpFormat(data) {


}

function unmidFormat(mid) {
   var return_data = [];
    var data = eval(mid);
   for(var i in data){
       a = data[i]["value"]
       return_data.push(a)
   }
   return return_data
}

function remove(val) {
    var return_data = [];
    var c_name_list = [];
    for (var i in val){
        var dict_data = {};
        dict_data["name"] = i;
        dict_data["value"] = val[i]["c_name"];
        if(i < 1){
            return_data.push(dict_data);
        }else {
            if(c_name_list.includes(val[i]["c_name"]) !== true){
                return_data.push(dict_data);
            }
        }
        c_name_list.push(val[i]["c_name"])
    }
    return return_data
}

function get_dict(selected_item, select_option) {
    var data_dict = {};
    if(selected_item.length !== 0){
        for(var i in selected_item){
            data_dict[i] = selected_item[i]
        }
    }else {
        for (var j in select_option){
            data_dict[j] = select_option[j]["value"]
        }
    }
    return data_dict
}


export {
    timeFormat,
    roomDataFormat,
    midFormat,
    setpFormat,
    unmidFormat,
    remove,
    get_dict,
    yearsFormat
}
