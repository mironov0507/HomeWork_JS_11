class User {
    constructor(contactData){
        this.data = {};
        [
            this.data['name'],
            this.data['email'],
            this.data['phone'],
            this.data['id']
        ] = contactData
    }
        get info() {
            return this.data
        }

        set info(contactData){
            [
                this.data['name'],
                this.data['email'],
                this.data['phone'],
                this.data['id']
            ] = contactData
        } 
}

class Contacts{
    constructor(){
        this.contactList = [];
    }

    add(contactData){
        this.contactList.push(new User(contactData))
    }

    show(){
        let infoContact = [];
        this.contactList.forEach(function(element){
            infoContact.push(element.info)
        })

        return infoContact
    }

    remove(id){
        this.contactList.forEach((element, index)=>{
            if(element.data.id == id){
                this.contactList.splice(index,1);
            }
        })
        return this.contactList
    }

    change(id){
        this.contactList.forEach((element)=>{
            if(element.data.id == id){
                let inputChange = document.createElement('div');
                inputChange.innerHTML =`<div class="change_text">
                
                <input type="text" name="ch_name" value="${element.data['name']}"><br>
                <input type="text" name="ch_email" value="${element.data['email']}"><br>
                <input type="text" name="ch_phone" value="${element.data['phone']}"><br>
                <button class='ok' name="add">Ok</button>
                
                </div>`
    
                document.body.appendChild(inputChange);

                let btnOk = document.querySelector('.ok');
             
      
                btnOk.addEventListener('click', ()=>{
                    let ch_name = document.querySelector('input[name="ch_name"]').value;
                    let ch_email = document.querySelector('input[name="ch_email"]').value;
                    let ch_phone = document.querySelector('input[name="ch_phone"]').value;

                    let changeData = [];
                    changeData.push(ch_name, ch_email, ch_phone, id);

                    element.info = changeData

                    inputChange.remove();
                })
            }
        })
        return this.contactList
    }  
}                                                                                                         

class ContactApp extends Contacts{
    constructor(){
        super()
        this.addEvent();
        
    }

    addEvent(){

        let btn = document.querySelector('button[name="add"]');
       
        btn.addEventListener('click',()=>{
            let id = Date.now();
            this.onAdd(id).onShow()
        })
    }

    onAdd(id){

        let name = document.querySelector('input[name="name"]').value;
            let email = document.querySelector('input[name="email"]').value;
            let phone = document.querySelector('input[name="phone"]').value;

            let infoData = [];
            infoData.push(name, email, phone, id)

            this.add(infoData);
            return this
    }

    onShow(){

        let html = '';
            this.show().forEach((element)=>{
                html +=`Имя: ${element.name}; Эл. почта: ${element.email}; Телефон: ${element.phone}; <button class='delete' id = '${element.id}'>Delete</button><button class='change' id = '${element.id}'>Change</button><br>`
            })
            document.querySelector('.list').innerHTML = html;
            document.querySelector('input[name="name"]').value = '';
            document.querySelector('input[name="email"]').value = '';
            document.querySelector('input[name="phone"]').value = '';

        let btnDelete = document.querySelectorAll('.delete');
             
        btnDelete.forEach((element)=>{
            element.addEventListener('click', (event)=>{

                this.onRemove(event.target.id).onShow()
            })
        })

        let btnChange = document.querySelectorAll('.change');
             
        btnChange.forEach((element)=>{
            element.addEventListener('click', (event)=>{

                this.onChange(event.target.id).onShow()
            })
        })


    }

    onRemove(id){
        this.remove(id)
        return this
    }

    onChange(id){
        this.change(id)
        return this
    }

}

let app = new ContactApp();
