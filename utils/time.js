const timer = setInterval(function (nowtime) {
    var that = this
    function fill_zero_prefix(num) {
      return num < 10 ? "0" + num : num
    }
    var time = new Date(nowtime);
    var now = new Date();
    var restTime = time - now;
    var day = restTime / 1000 / 60 / 60 / 24;
    var hours = ((day) - parseInt(day)) * 24;
    var minutes = (((hours) - (parseInt(hours))) * 60) - parseInt(((hours) - (parseInt(hours))) * 60);
    var seconds = fill_zero_prefix(parseInt(
      (((parseInt(minutes * 60 * 1000)) / 1000).toFixed(2) - parseInt(
        ((parseInt(minutes * 60 * 1000)) / 1000).toFixed(2)
      )) * 100
    ));
    var miniseconds = parseInt(
      (((parseInt(minutes * 60 * 1000)) / 1000).toFixed(2) - parseInt(
        ((parseInt(minutes * 60 * 1000)) / 1000).toFixed(2)
      )) * 100
    );
    var newTime = fill_zero_prefix(parseInt(day)) + "天" + fill_zero_prefix(parseInt(hours)) + "小时" + fill_zero_prefix(parseInt(((hours) - (parseInt(hours))) * 60)) + "分钟" + fill_zero_prefix(parseInt(minutes * 60)) + "秒" + seconds;

    if (restTime <= 0) {
      that.setData({
        time: {
          day1: "0",
          day2: "0",
          hours1: "0",
          hours2: "0",
          minutes1: "0",
          minutes2: "0",
          seconds1: "0",
          seconds2: "0",
          miseconds1: "0",
          miseconds2: "0"
        },
        end: "投票已结束"
      })
    } else {
      that.setData({
        time: {
          day1: fill_zero_prefix(parseInt(day)).toString().substring(0, 1),
          day2: fill_zero_prefix(parseInt(day)).toString().substring(1, 2),
          hours1: fill_zero_prefix(parseInt(hours)).toString().substring(0, 1),
          hours2: fill_zero_prefix(parseInt(hours)).toString().substring(1, 2),
          minutes1: fill_zero_prefix(parseInt(((hours) - (parseInt(hours))) * 60)).toString().substring(0, 1),
          minutes2: fill_zero_prefix(parseInt(((hours) - (parseInt(hours))) * 60)).toString().substring(1, 2),
          seconds1: fill_zero_prefix(parseInt(minutes * 60)).toString().substring(0, 1),
          seconds2: fill_zero_prefix(parseInt(minutes * 60)).toString().substring(1, 2),
          miseconds1: seconds.toString().substring(0, 1),
          miseconds2: seconds.toString().substring(1, 2)
        },
        end: "距离投票结束"
      })
    }
  }, 100)
  that.setData({
    timer: timer
  })


module.exports.timer = timer

