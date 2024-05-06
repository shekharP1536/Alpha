console.log('loaded');
$("#setting_dock_div").click(function (e) { 
    e.preventDefault();
    $("#setting_overlap_modal").css("display", "block");
    console.log('feature_exe');
});

$("#setting_modal_close_btn").click(function (e) { 
    e.preventDefault();
    $("#setting_overlap_modal").css("display", "none");
});