/**
 * Created by Manda
 * Email : abdellatif.abazine@gmail.com
 */
var i = 0,tds;
$(document).ready(retriveData());
function addContact(){
    var firstName = $("#firstName").val(),
        lastName  = $("#lastName").val(),
        phoneNumber  = $("#phoneNumber").val(),
        email =$("#email").val(),
        firebaseRef = firebase.database().ref('contacts'),
        table = $("#DBshow"),
        btnRm = "<button type='button' class='btn btn-danger' style='font-size: medium;min-width: 90px;min-height: 30px' onclick='remove(this)' >Remove</button>",
        btnMd ="<button type='button' class='btn btn-primary' style='font-size: medium;width: 90px;min-height: 30px' onclick='modify(this)' >Modify</button>",
        contact = {
            first_name : firstName,
            last_name : lastName,
            phone_number : phoneNumber,
            e_mail : email};
    if(verifyForm()){
        i++;
        firebaseRef.child(i).set(contact);
        table.append("<tr><td>"+i+"</td>"+"<td>"+firstName+"</td>"+"<td>"+lastName+"</td>"+"<td>"+phoneNumber+"</td>"+"<td>"+email+"</td>"+"<td>"+btnMd+"   "+btnRm+"</td></tr>");
        cancel();}
}

function verifyForm() {
    var result = validateFL($("#firstName"));
    result = validateE() && result;
    result = validateFL($("#lastName")) && result;
    result = validPhone() && result;
    return result;

}
function validateEmail(email) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
}
function validateE() {
    var email = $("#email");
    if (validateEmail(email.val())) {
        email.parent().removeClass("has-warning");
        email.parent().addClass("has-success");
        return true;
    }else{
        email.parent().removeClass("has-success");
        email.parent().addClass("has-warning");
        return false;
    }
}
function validateFL(object) {
    var str = object.val(),
        parent = object.parent();
    if (validateName(str)) {
        parent.removeClass("has-warning");
        parent.addClass("has-success");
        return true;
    }else{
        parent.removeClass("has-success");
        parent.addClass("has-warning");
        return false;
    }
}
function validateName(str) {
    var reg1 = /^[a-z]{1,15}$/i;
    return reg1.test(str);
}
function  validP(phoneN) {
    var reg = /^\d{10}$/;
    return reg.test(phoneN);
}
function validPhone() {
    var phoneN = $("#phoneNumber");
    if (validP(phoneN.val())) {
        phoneN.parent().removeClass("has-warning");
        phoneN.parent().addClass("has-success");
        return true;
    }else{
        phoneN.parent().removeClass("has-success");
        phoneN.parent().addClass("has-warning");
        return false;
    }
}
function  modify(item) {
    tds = $(item.parentNode.parentNode).children();
    var    contact = [];
    tds.each(function () {
        contact.push($(this).text());
    });

    var firstName = $("#firstName"),
        lastName = $("#lastName"),
        phoneNumber = $("#phoneNumber"),
        email = $("#email"),
        btnWarp = $("#btn-warper"),
        btnUpdate = "<button type='button' class='btn btn-primary' style='font-size: medium;width: 90px;min-height: 40px;position:relative;left:53px;' onclick='update()' >Update</button>",
        btnCancel = "<button type='button' class='btn btn-danger' style='font-size: medium;width: 90px;min-height: 40px;margin-left: 5px;position:relative;left:53px;' onclick='cancel(this)' >Cancel</button>";

    firstName.val(contact[1]);
    firstName.trigger("change");
    lastName.val(contact[2]);
    lastName.trigger("change");
    phoneNumber.val(contact[3]);
    phoneNumber.trigger("change");
    email.val(contact[4]);
    email.trigger("change");

    btnWarp.children().remove();
    btnWarp.append(btnUpdate);
    btnWarp.append(btnCancel);
}
function update() {
    if(verifyForm()){
        var firstName = $("#firstName").val(),
            lastName  = $("#lastName").val(),
            phoneNumber  = $("#phoneNumber").val(),
            email = $("#email").val(),
            contact = {
                first_name : firstName,
                last_name : lastName,
                phone_number : phoneNumber,
                e_mail : email};
        k = 0;
        for(attr in contact){
            tds.eq(k+1).text(contact[attr]);++k;}
        firebase.database().ref('contact').child(tds.eq(0).text()).update(contact);
        cancel();}
}

function cancel() {

    var btnWarp = $("#btn-warper"),
        btnAdd = "<button type='button' class='btn btn-primary center-block' style='font-size: medium;width: 90px;height: 40px' onclick='addContact()' >Add</button>";
    $("#fm").find("input").each(function () {
        $(this).val("");
    });
    backToZero();
    btnWarp.children().remove();
    btnWarp.append(btnAdd);
}

function  remove(item) {
    var firebaseRef = firebase.database().ref('contacts'),
        ligne = $(item.parentNode.parentNode)
    path = ligne.children().first().text();
    firebaseRef.child(path).remove();
    ligne.remove();
}

function  retriveData() {
    var firebaseRef = firebase.database().ref('contacts');
    firebaseRef.once("value").then(read_data);
}
    function backToZero() {
        var firstName = $("#firstName"),
            lastName  = $("#lastName"),
            phoneNumber  = $("#phoneNumber"),
            email = $("#email");
            firstName.parent().attr("class","col-sm-4");
        lastName.parent().attr("class","col-sm-4");
        phoneNumber.parent().attr("class","col-sm-4");
        email.parent().attr("class","col-sm-4");

    }

function read_data(snap) {
    snap.forEach(function (object) {
        var firstName = object.child("first_name").val(),
            table = $("#DBshow"),
            lastName = object.child("last_name").val(),
            email = object.child("e_mail").val(),
            phoneNumber = object.child("phone_number").val(),
            btnRm = "<button type='button' class='btn btn-danger'  style='font-size: medium;min-width: 90px;min-height: 30px' onclick='remove(this)' >Remove</button>",
            btnMd ="<button type='button' class='btn btn-primary' style='font-size: medium;width: 90px;min-height: 30px' onclick='modify(this)' >Modify</button>";
            i=object.key;
            table.append("<tr><td>"+i+"</td>"+"<td>"+firstName+"</td>"+"<td>"+lastName+"</td>"+"<td>"+phoneNumber+"</td>"+"<td>"+email+"</td>"+"<td>"+btnMd+"   "+btnRm+"</td></tr>");
    });
    i = parseInt(i);
}
