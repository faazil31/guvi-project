const form=document.querySelector("#signup_form")
const username=document.querySelector("#username")
const email=document.querySelector("#email")
const pass=document.querySelector("#password")
const c_pass=document.querySelector("#c_password")

form.addEventListener('submit',(event)=>
{
    
    let submit=validate();
    if(!submit)
    {
        event.preventDefault();
    }
})

function validate()
{
    const user_val=username.value.trim();
    const pass_val=pass.value.trim();
    const email_val=email.value.trim();
    const c_pass_val=c_pass.value.trim();
    let success=true;
    // console.log(user_val)
    if(user_val==='')
    {
        success=false;
        err_mes(username,"Please fill the username tag");
    }

    else
    {
        set_success(username)
    }

    //email
    if(email_val==='')
    {
        success=false;
        err_mes(email,"Email Required")
    }
    else if(!validateEmail(email_val))
    {
        success=false;
        err_mes(email,"Email Invalid")
    }
    else{
        set_success(email);
    }

    //pass
    if(pass_val==='')
    {
        success=false;
        err_mes(pass,'Passw required')
    }
    else if(pass_val.length<8)
    {
        success=false;
        err_mes(pass,'Too short')
    }
    else{
        set_success(pass)
    }

    //c_pass
    if(c_pass_val==='')
    {
        success=false;
        err_mes(c_pass,"Password required")
    }
    else if(c_pass_val!=pass_val)
    {
        success=false;
        err_mes(c_pass,"Password doesnt match")
    }
    else
    {
        set_success(c_pass)
    }
    return success;

}

function err_mes(element,message)
{
    const parent=element.parentElement;
    const error_box=parent.querySelector(".error");
    error_box.innerHTML=message;
    parent.classList.add('error')
    parent.classList.remove('success')
}

function set_success(element)
{
    const parent=element.parentElement;
    const error_box=parent.querySelector(".error");
    parent.classList.add('success')
    parent.classList.remove('error')
}

const validateEmail=(email)=>
{
    return String(email)
    .toLowerCase()
    .match( 
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    );
}