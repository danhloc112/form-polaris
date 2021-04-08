/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {TextField, FormLayout, Button} from '@shopify/polaris';
import { useState,useCallback, useEffect } from 'react';
import {TextStyle, Card, IndexTable,useIndexResourceState } from '@shopify/polaris';
import ReCAPTCHA from "react-google-recaptcha";
const url = "https://my-json-server.typicode.com/danhloc112/form-polaris/users"
const Form = () => {
    const regex = /[$&+,:;=?@#|'<>.^*()%!-]/;
    const [showFirstName,setShowFirstName] = useState('')
    const [firstName,setFirstName] = useState('')
    const [showPhone,setShowPhone] = useState('')
    const [showPhoneType,setShowPhoneType] = useState('')
    const [showAddress,setShowAddress] = useState('')
    const [address, setAddress] = useState('')
    const [phone,setPhone] = useState('')
    // const [username, setUsername] = useState('')
    // const [showUsername,setShowUsername] = useState('')
    // const [showUsernameMin,setShowUsernameMin] = useState('')
    const [email, setEmail] = useState('')
    const [showEmail,setShowEmail] = useState('')
    const [showEmailType,setShowEmailType] = useState('')
    // const [password, setPassword] = useState('')
    // const [showPassword,setShowPassword] = useState('')
    // const [showPassType,setShowPassType] = useState('')
    // const [confirm, setConfirm] = useState('')
    // const [showConfirm,setShowConfirm] = useState('')
    // const [showConfirmType,setShowConfirmType] = useState('')
    const [verify,setVerify] = useState(false)
    const [firstOk,setFirstOk] = useState(false)
    const [phoneOk, setPhoneOk] = useState(false)
    // const [userOk, setUserOk] = useState(false)
    const [emailOk, setEmailOk] = useState(false)
    const [addressOk,setAddressOk] = useState(false)
    const [create,setCreate] = useState(false)    
    const [listData, setListData] = useState([])
    // const [passOk, setPassOk] = useState(false)
    
    
    // const debouncedKeyUp = _.debounce((value) => {
    //     setFirstName(value)
    // }, 500);
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(js => setListData(js))
    },[])
    const handleFullNameChange = useCallback((value) => {
        setFirstName(value)
        if (value === '') {
            setShowFirstName(true) 
        }
        else {
            setShowFirstName(false)
            setFirstOk(true)
        }
    },[])
    const handlePhoneChange = useCallback((value) => {
        const regex = /(84|0[2|3|5|7|8|9])+([0-9]{8,})\b/g;
        setPhone(value)
        if (value === '') {
            setShowPhone(true)
            setShowPhoneType(false)
        }
        else if (!regex.test(value)) {
            setShowPhone(false)
            setShowPhoneType(true)
        }
        else {
            setShowPhone(false)
            setShowPhoneType(false)
            setPhoneOk(true)
        }
    },[])

    const handleAddressChange = useCallback((value) => {
        setAddress(value)
        if (value === '') {
            setShowAddress(true) 
        }
        else {
            setShowAddress(false)
            setAddressOk(true) 
        }
    },[])
    // const handleUserChange = useCallback((value) => {
    //     setUsername(value)
    //     if (value === '') {
    //         setShowUsername(true)
    //         setShowUsernameMin(false)
    //     }
    //     else if (value.length < 7) {
    //         setShowUsernameMin(true)
    //         setShowUsername(false)
            
    //     }
    //     else {
    //         setShowUsername(false)
    //         setShowUsernameMin(false)
    //         setUserOk(true)
    //     }
    // },[])

    const handleEmailChange = useCallback((value) => {
        const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        setEmail(value)
        if (value === '') {
            setShowEmail(true)
            setShowEmailType(false)
        }
        else if (!regex.test(value)) {
            setShowEmail(false)
            setShowEmailType(true)
        }
        else {
            setShowEmail(false)
            setShowEmailType(false)
            setEmailOk(true)
        }
    },[])
    // const handlePassChange = useCallback((value) => {
    //     const regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/
    //     setPassword(value)
    //     if (value === '') {
    //         setShowPassword(true)
    //         setShowPassType(false)
    //     }
    //     else if (!regex.test(value)) {
    //         setShowPassword(false)
    //         setShowPassType(true)
    //     }
    //     else {
    //         setShowPassword(false)
    //         setShowPassType(false)
    //         setPassOk(true)
    //     }
    // },[])
    // const handleConfirmChange = useCallback((value, password) => {
    //     console.log("password", password);
    //     setConfirm(value)
    //     if (value === '') {
    //         setShowConfirm(true)
    //         setShowConfirmType(false)
    //     }
    //     else if (value !== password) {
    //         setShowConfirm(false)
    //         setShowConfirmType(true)
    //     }
    //     else {
    //         setShowConfirm(false)
    //         setShowConfirmType(false)
    //     }
    // },[])
    const handleVerified = async () => {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name: firstName,
                address: address,
                phone: phone,
                email: email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((json) => console.log("JSON",json));
        
        alert('Success!')
        setVerify(false)
        
    }
    // const handleSubmit = useCallback((e, verify,firstOk,lastOk,userOk,emailOk,passOk,addressOk) => {
    //     console.log("object");
    //     if (verify && firstOk && lastOk && userOk && emailOk && passOk && addressOk) {
    //         alert('Success!')
    //     }
    //     else {
    //         alert('Please input all of fields!')
    //     }
    // }, [])

    const resourceName = {
        singular: 'listData',
        plural: 'listDatas',
    }
    
    const handleSubmit = (e) => {
        console.log("List", listData);
        if (firstOk && phoneOk && emailOk && addressOk) {
            setVerify(true)
        }
        else {
            setVerify(false)
            setShowAddress(true)
            setShowEmail(true)
            setShowPhone(true)
            setShowFirstName(true)
        }
    }
    const {
        selectedResources,
        allResourcesSelected,
        handleSelectionChange,
      } = useIndexResourceState(listData);
    const rowMarkup = listData.map(
        ({ id,name,address,phone,email },index) => 
            // const addressLink = 'https://www.google.com/maps/place/'+address.split(regex).join('+')
            ( 
          <IndexTable.Row
            id={id}
            key={id}
            // selected={selectedResources.includes(id)}
            position={index}
          >
            <IndexTable.Cell>
              <TextStyle variation="strong">{name}</TextStyle>
            </IndexTable.Cell>
            <IndexTable.Cell>{email}</IndexTable.Cell>
            <IndexTable.Cell>{phone}</IndexTable.Cell>
            <IndexTable.Cell><a href={`https://www.google.com/maps/place/${address.split(regex).join('+')}`} target="_blank" rel="noreferrer">{address}</a></IndexTable.Cell>
          </IndexTable.Row>
        ),
    );
    

    return (
        <>
            <div className="row navigation">
                <div className="col l-4 l-0-3">
                <Button style={{ marginRight: 10 }} primary onClick={() => setCreate(!create)}>Create user</Button>
                {'  '}
                <Button primary>Show user</Button>
                
                </div>
            </div>
            {create &&
                <div className="row form-input">
                    <div className="col l-6 l-0-3">
                    <FormLayout onSubmit= {(e) => handleSubmit(e)}>
                        <TextField label="Full Name(*)" onChange={(e) => handleFullNameChange(e)} value={firstName} placeholder="Input your first name"/>
                        {showFirstName && <p className="warning">Input your first name, please!</p>}
                        

                        {/* <TextField label="Username(*)" onChange={(e) => handleUserChange(e)} value={username}/>
                        {showUsername && <p className="warning">Input your username, please!</p>}
                        {showUsernameMin && <p className="warning">Your username must be longer than 6 characters!</p>} */}

                        <TextField type="email" label="Email(*)" onChange={(e) => handleEmailChange(e)} value={email} placeholder="Input your email" />
                        {showEmail && <p className="warning">Input your email, please!</p>}
                        {showEmailType && <p className="warning">Your email is not right format!</p>}

                        {/* <TextField type="password" label="Password(*)" onChange={(e) => handlePassChange(e)} value={ password}/>
                        {showPassword && <p className="warning">Input your password, please!</p>}
                        {showPassType && <p className="warning">Your password must be at least 8 characters and contain numbers and letters</p>}

                        <TextField type="password" label="Confirm Password(*)" onChange={(e) => handleConfirmChange(e, password)} value={confirm}/>
                        {showConfirm && <p className="warning">Confirm your password, please!</p>}
                        {showConfirmType && <p className="warning">Your password is not match!</p>} */}

                        <TextField label="Address(*)" onChange={(e) => handleAddressChange(e)} value={address} placeholder="Input your address"/>
                        {showAddress && <p className="warning">Input your address, please!</p>}

                        <TextField label="Phone Number(*)" onChange={(e) => handlePhoneChange(e)}  value={phone} placeholder="Input your phone number"/>
                        {showPhone && <p className="warning">Input your phone numbers, please!</p>}
                        {showPhoneType && <p className="warning">Your phone number is not right format!</p>}

                        <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
                        {verify && 
                            <ReCAPTCHA
                            sitekey="6LftMKEaAAAAAMFVIG7Qcma2394rdYh5srsZlnXd"
                            onChange={handleVerified}
                            />
                        }
                        </FormLayout>
                    </div>
                </div>
            }
            <div className="row">
                <div className="col l-10 l-0-1">
                <Card>
                    <IndexTable
                        resourceName={resourceName}
                        itemCount={listData.length}
                        selectedItemsCount={
                        allResourcesSelected ? 'All' : selectedResources.length
                        }
                        onSelectionChange={handleSelectionChange}
                        headings={[
                        {title: 'Name'},
                        {title: 'Email'},
                        {title: 'Phone'},
                        {title: 'Address'},
                        ]}
                    >
                        {rowMarkup}
                    </IndexTable>
                </Card>
                </div>
            </div>
        
        </>
    )
}
export default Form;