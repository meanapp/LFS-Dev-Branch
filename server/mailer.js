var sendgrid=require('sendgrid')('LFS Quinnox','lfsQuinnox_2015');
var hogan= require('hogan.js');
var express = require('express');
var router=express.Router();
var fs = require('fs');
var mailStatus= require('./models/MailStatus.js');

exports.registerUser = function(userEmail,firstName,id){
                console.log("inside Register-->");
                console.log("printing userEmail--> "+userEmail+" firstname--> "+firstName +"id-->" +id);
                var template=fs.readFileSync('./views/registration.hjs','utf-8');
                var compiledTemplate =hogan.compile(template);
                var dataArray = {firstName: firstName ,id: id};
                sendgrid.send({
                    to:        userEmail,
                    from:     'noreply@lfsquinnox.com',
                    subject:  'Welcome to Leave Forcasting System.',
                    html :    compiledTemplate.render(dataArray)
                }, function(err, json) {
                    if (err) { 
                        new mailStatus({
                            userEmailAddress: userEmail,
                            time : Date.now(),
                            status: "failed"  
                        }).save(function(err,doc){
                                if(err) console.log(err);
                                else console.log("registration mail failed");
                            });
                                console.log("error in sending mail" +err); 
                    }else{
                        new mailStatus({
                            userEmailAddress: userEmail,
                            time : Date.now(),
                            status: "success"  
                        }).save(function(err,doc){
                            if(err) console.log(err);
                            else console.log("Registration mail sent successfully");
                        });
                        
                    }
                                       
    
                    }); 
}

exports.newLeaveRequestEmp = function(userEmail,firstName,fromDate,toDate){
                console.log("printing userEmail--> "+userEmail+" firstname--> "+firstName+" fromDate--> "+fromDate+" todate--> "+toDate);
                console.log("inside New_Leave_Request-->");
                var dataArray = {firstName: firstName ,fromDate:fromDate ,toDate:toDate};
                console.log(dataArray);console.log( "dataarray....");
                var template=fs.readFileSync('./views/LeaveCreated.hjs','utf-8');
                                var compiledTemplate =hogan.compile(template);
                                sendgrid.send({
                                        to:        userEmail,
                                        from:     'noreply@lfsquinnox.com',
                                        subject:  'Leave request created',
                                        html :    compiledTemplate.render(dataArray)
                                }, function(err, json) {
                                    if (err) { new mailStatus({
                                            userEmailAddress: userEmail,
                                            time : Date.now(),
                                            status: "failed"  
                                            }).save(function(err,doc){
                                                if(err) console.log(err);
                                                else console.log("New leave request mail failed");
                                             });
                                         console.log("error in sending mail" +err);  }
                                    else{ new mailStatus({
                                            userEmailAddress: userEmail,
                                            time : Date.now(),
                                            status: "success"  
                                            }).save(function(err,doc){
                                                if(err) console.log(err);
                                                else console.log("New leave request mail sent");
                                             });
                                         }
                                });
}
exports.newLeaveRequestMgr = function(userEmail,firstName,fromDate,toDate){
 console.log("printing userEmail--> "+userEmail+" firstname--> "+firstName+" fromDate--> "+fromDate+" todate--> "+toDate);
                console.log("inside New_Leave_Request-->");
                var dataArray = {firstName: firstName ,fromDate:fromDate ,toDate:toDate};
                var template=fs.readFileSync('./views/NewLeaveRequestMgr.hjs','utf-8');
                                var compiledTemplate =hogan.compile(template);
                                sendgrid.send({
                                        to:        userEmail,
                                        from:     'noreply@lfsquinnox.com',
                                        subject:  'Leave request created',
                                        html :    compiledTemplate.render(dataArray)
                                }, function(err, json) {
                                    if (err) { new mailStatus({
                                            userEmailAddress: userEmail,
                                            time : Date.now(),
                                            status: "failed"  
                                            }).save(function(err,doc){
                                                if(err) console.log(err);
                                                else console.log("New leave request mail failed");
                                             });
                                         console.log("error in sending mail" +err);  }
                                    else{ new mailStatus({
                                            userEmailAddress: userEmail,
                                            time : Date.now(),
                                            status: "success"  
                                            }).save(function(err,doc){
                                                if(err) console.log(err);
                                                else console.log("New leave request mail sent");
                                             });
                                         }
                                });
}

exports.resetPassword =function(userEmail,id){
            console.log("inside resetpassword--->");
            console.log("printing email---> "+userEmail);
            var template=fs.readFileSync('./views/ResetPassword.hjs','utf-8');
                                var compiledTemplate =hogan.compile(template);
                                sendgrid.send({
                                        to:        userEmail,
                                        from:     'noreply@lfsquinnox.com',
                                        subject:  'Password Reset,Leave forecasting system',
                                        html :    compiledTemplate.render({id:id})
                                }, function(err, json) {
                                    if (err) { new mailStatus({
                                            userEmailAddress: userEmail,
                                            time : Date.now(),
                                            status: "failed"  
                                            }).save(function(err,doc){
                                                if(err) console.log(err);
                                                else console.log("Reset Password mail failed");
                                             });
                                         console.log("error in sending mail" +err);  }
                                    else{ new mailStatus({
                                            userEmailAddress: userEmail,
                                            time : Date.now(),
                                            status: "success"  
                                            }).save(function(err,doc){
                                                if(err) console.log(err);
                                                else console.log("Reset password mail succesfully sent");
                                             });
                                    }
                                });
}

exports.leaveStatus= function(userEmail,firstName,leaveStatus,fromDate,toDate){
            console.log("inside Leave_status-->");
            console.log("printing userEmail--> "+userEmail+" firstname--> "+firstName+" fromDate--> "+fromDate+" todate--> "+toDate+" Status--> "+leaveStatus);
            var dataArray = {firstName: firstName,fromDate:fromDate,toDate:toDate,leaveStatus:leaveStatus};
            console.log(dataArray);
            var template=fs.readFileSync('./views/LeaveStatus.hjs','utf-8');
                                var compiledTemplate =hogan.compile(template);
                                sendgrid.send({
                                        to:        userEmail,
                                        from:     'noreply@lfsquinnox.com',
                                        subject:  'Leave Status changed!!! Leave forecasting System',
                                        html :    compiledTemplate.render(dataArray)
                                }, function(err, json) {
                                    if (err) { new mailStatus({
                                            userEmailAddress: userEmail,
                                            time : Date.now(),
                                            status: "failed"  
                                            }).save(function(err,doc){
                                                if(err) console.log(err);
                                                else console.log("Leave status mail failed");
                                             });
                                         console.log("error in sending mail" +err);  }
                                    else{ new mailStatus({
                                            userEmailAddress: userEmail,
                                            time : Date.now(),
                                            status: "success"  
                                            }).save(function(err,doc){
                                                if(err) console.log(err);
                                                else console.log("Leave status mail sent succesfully");
                                             });
                                        }
                                });
           }
