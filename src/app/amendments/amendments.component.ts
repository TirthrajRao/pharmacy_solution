import { Component, OnInit , ViewChild} from '@angular/core';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
declare var $;
@Component({
  selector: 'app-amendments',
  templateUrl: './amendments.component.html',
  
  styleUrls: ['./amendments.component.scss'],
})
export class AmendmentsComponent implements OnInit {
  newComment: any;
  @ViewChild('content') content:any;
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  constructor(
    public datepipe: DatePipe
  ) {
    console.log("HEllo in chat page");
    this.getMessage();
  }
  comments: any = [];
  ngOnInit() { }


  // MUmfgl573IosWMkeQyx

  getMessage() {
    // this.loading = true;
    firebase.database().ref('chat_data/-MUmfgl573IosWMkeQyx/message').on('value', resp => {
      console.log("res", resp.val())
      let tmp = [];
      this.comments = [];
      for (const property in resp.val()) {
        this.comments.push({
          user_id: resp.val()[property].user_id,
          sender_id: resp.val()[property].sender_id,
          comment_content: resp.val()[property].msg,
          comment_date: resp.val()[property].date
        });
        console.log(`${property}: ${resp.val()[property].msg}`);
      }
      console.log("comments ==>", this.comments);
      setTimeout(() => {
        this.content.scrollToBottom(0)
     
      }, 100);
      
    });
  }

  sendMessage() {
    var date = new Date();
    var formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
    console.log("date", formattedDate)

    let joinData = firebase.database().ref('chat_data/-MUmfgl573IosWMkeQyx/message').push();
    joinData.set({
      date: formattedDate,
      is_read: 0,
      message_type: "text",
      msg: this.newComment,
      sender_id: this.currentUser.id,
      user_id: this.currentUser.id
    });
    this.newComment = '';
  }

  getTimeStamp(timestamp) {
    return this.datepipe.transform(timestamp, 'HH:mm dd-MMM-yyyy')
  }
  

}
