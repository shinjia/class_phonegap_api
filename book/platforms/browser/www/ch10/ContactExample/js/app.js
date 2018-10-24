document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady()
	{		
		getContacts();	
	}
	
	function findContact(filterStr,returnFields,onSuccessFun,onErrorFun)
	{
	   
		var options = null;	
		if (filterStr != "")
		{
			options= new ContactFindOptions();
			options.filter=filterStr;
		}			
		navigator.contacts.find(returnFields, onSuccessFun, onErrorFun, options);
	}
	
	function getContacts()
	{
		var contactFields=["id","displayName","name"];		
		findContact("",contactFields,contactSuccess,onError);
	}
	
	function contactSuccess(contacts)
	{
		console.log("contacts.length:"+contacts.length);
		var htmlStr = "";
		for (var i=0;i<contacts.length;i++)
		{				
			$("#contactlistdiv").append("<li><a href=\"#\" onclick=goToActionList(\""+contacts[i].id+"\") data-rel=\"dialog\" data-transition=\"pop\" >"+contacts[i].displayName+"</a><a href=\"#\" onclick=goToContentDetail(\""+contacts[i].id+"\") ></a></li>");
		}
		console.log($("#contactlistdiv").html());
		$("#contactlistdiv").listview("refresh");		
	}
	
	function goToActionList(contactName)
	{
		getPhoneAndEmail(contactName);
	}
	
	function getPhoneAndEmail(contactId)
	{
		console.log("contactName:"+contactId);		
		var fields = ["id","displayName","emails","phoneNumbers"];		
		findContact(contactId,fields,actionListSuccess,onError);	
	}
	
	function goToContentDetail(contactId)
	{
		console.log("contactID:"+contactId);		
		var fields = ["id","displayName","name","phoneNumbers","emails","ims","organizations","addresses","categories"];	
		findContact(contactId,fields,contactDetailSuccess,onError);
	
	}
	
	function onError(error)
	{
		console.log(error.toString());
	}
	
	
	function actionListSuccess(contacts)
	{
	
		console.log("actionListSuccess:"+contacts.length);
		var htmlStr="";
		$("#controlgroupdiv").html('');
		if (contacts.length >0 )
		{
			
			if (contacts[0].phoneNumbers)
			{
				var phone0 = contacts[0].phoneNumbers[0];
				console.log("phone0:"+phone0.type+";"+phone0.value);
				htmlStr+='<a href="tel:'+contacts[0].phoneNumbers[0].value+'" data-icon="arrow-r" data-role="button" data-inline="true">Call</a>';
				htmlStr+='<a href="sms:'+contacts[0].phoneNumbers[0].value +'"data-icon="arrow-r" data-role="button" data-inline="true">Msg</a>';				
			}	

			if (contacts[0].emails)
			{
				console.log("emails:"+contacts[0].emails);
				htmlStr+='<a href="mailto:'+contacts[0].emails[0]+'" data-icon="arrow-r" data-role="button" data-inline="true">Email</a>';				
			}	
			$("#controlgroupdiv").html(htmlStr);		
			$.mobile.changePage("#actionlist");	
			
		}
		else
		{
			alert("wrong access ");
		}				
	}
	
	
	function contactDetailSuccess(contacts)
	{
		console.log("actionListSuccess:"+contacts.length);		
		if (contacts.length >0 )
		{
			updateContactName(contacts[0],"#contactnamestr");	
			updateContactField(contacts[0],"phoneNumbers","#contactphonetr");
			updateContactField(contacts[0],"emails","#contactemailstr");
			updateContactField(contacts[0],"ims","#contactimstr");
			updateContactField(contacts[0],"categories","#contactgroupstr");
			updteOrganization(contacts[0],"#contactorganizationstr");
			updateAddress(contacts[0],"#contactaddstr");			
			$.mobile.changePage("#contactdetail");
		}
		else
		{
			alert("wrong access ");
		}			
	
	} 
	
	function updateContactName(contact,targetContent)
	{
		checkContactNull(contact);	
		var nameField = contact.name;
		console.log("nameField:"+nameField.formatted+";"+nameField.DisplayName);	
		var htmlStr=nameField.familyName+nameField.middleName+nameField.givenName;			
		$("#contactnamestr").html(htmlStr);
	
	}
	
	function updateContactField(contact,fieldName,targetContent)
	{
		checkContactNull(contact);	
		var fieldObject ;
		var htmlStr = "";
				
		if ("phoneNumbers"== fieldName)
		{
			fieldObject = contact.phoneNumbers;
		}
		else if ("emails"==fieldName)
		{
			fieldObject = contact.emails;
		}
		else if ("ims"==fieldName)
		{
			fieldObject = contact.ims;
		}
		else if ("categories"==fieldName)
		{
			fieldObject = contact.categories;
		
		}
		console.log("fieldObject:"+fieldObject);
		if (fieldObject)
		{
			for (var i=0;i<fieldObject.length;i++)
			{
				htmlStr+="<p>"+fieldObject[i].type+":"+fieldObject[i].value+"</p>";
				
			}
		
		}
		$(targetContent).html(htmlStr);
	}
	
	function updteOrganization(contact,targetContent)
	{
		checkContactNull(contact);	
		var organizationField = contact.organizations;
		var htmlStr="";
		if (organizationField)
		for (var i=0;i<organizationField.length;i++)
			{
				htmlStr+="<p>"+organizationField[i].type+":"+organizationField[i].name+" "+organizationField[i].department+" "+organizationField[i].title+"</p>";
				
			}
		$(targetContent).html(htmlStr);
		
	}	
	
	function updateAddress(contact,targetContent)
	{	
		checkContactNull(contact);	
		var addressField = contact.addresses;
		var htmlStr="";
		if(addressField)
		for (var i=0;i<addressField.length;i++)
			{
				htmlStr+="<p>"+addressField[i].type+":"+addressField[i].formatted+"</p>";
				
			}
		$(targetContent).html(htmlStr);
	}
	
	function checkContactNull(contact)
	{
		if (!contact)
		{
			alert("wrong access");
		}
	}