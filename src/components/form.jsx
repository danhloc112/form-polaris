/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {TextField, FormLayout, Button, ResourceList, ResourceItem, Avatar, Heading, Pagination, Spinner, Link} from '@shopify/polaris';
import { useState,useCallback, useEffect } from 'react';
import {TextStyle, Card, IndexTable,useIndexResourceState, Page, DataTable } from '@shopify/polaris';
import ReCAPTCHA from "react-google-recaptcha";
// const url = "https://my-json-server.typicode.com/danhloc112/form-polaris/users"
const url = "https://606fafc985c3f0001746ecdf.mockapi.io/api/users/";
let page = 1;
const limit = 5
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
    const [listData,setListData] = useState([])
    const [total,setTotal] = useState([])
    const [show,setShow] = useState(false)
    const [loading,setLoading] = useState(false)
    const [prev,setPrev] = useState(false)
    const [next,setNext] = useState(true)
    
    
    // const [passOk, setPassOk] = useState(false)
    
    
    // const debouncedKeyUp = _.debounce((value) => {
    //     setFirstName(value)
    // }, 500);
    useEffect(() => {
        fetch(`${url}`)
            .then(res => res.json())
            .then(js => setTotal(js))
        
        fetch(`${url}?page=${page}&limit=${limit}`)
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
        setLoading(true)
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
            .then((json) => {
                setListData([...listData,json])
                setLoading(false)
            });
        
        alert('Success!')
        setVerify(false)
        setShow(true)
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
    // console.log("page", Math.ceil(total.length / limit));
    
    const handleNext = () => {
        // setPage(page + 1)
        page += 1;
        // console.log("page", page);
        // console.log("result", page * limit);
        if (page * limit >= total.length) {
            setNext(false)
            setPrev(true)
        }
        else {
            setPrev(true)
        }
        fetch(`${url}?page=${page}&limit=${limit}`)
        .then(res => res.json())
        .then(js => setListData(js))
    }
    const handlePrev = () => {
        // setPage(page-1)
        page -= 1;
        if (page === 1) {
            setPrev(false)
            setNext(true)
        }
        else {
            setNext(true)
        }
        fetch(`${url}?page=${page}&limit=${limit}`)
        .then(res => res.json())
        .then(js => setListData(js))
    }
    const handleSubmit = (e) => {
        // console.log("List", listData);
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
    // const {
    //     selectedResources,
    //     allResourcesSelected,
    //     handleSelectionChange,
    //   } = useIndexResourceState(listData);
    // const rowMarkup = listData.map(
    //     ({ id,name,address,phone,email },index) => 
    //         // const addressLink = 'https://www.google.com/maps/place/'+address.split(regex).join('+')
    //         ( 
    //       <IndexTable.Row
    //         id={id}
    //         key={id}
    //         // selected={selectedResources.includes(id)}
    //         position={index}
    //       >
    //         <IndexTable.Cell>
    //           <TextStyle variation="strong">{name}</TextStyle>
    //         </IndexTable.Cell>
    //         <IndexTable.Cell>{email}</IndexTable.Cell>
    //         <IndexTable.Cell>{phone}</IndexTable.Cell>
    //         <IndexTable.Cell><a href={`https://www.google.com/maps/place/${address.split(regex).join('+')}`} target="_blank" rel="noreferrer">{address}</a></IndexTable.Cell>
    //       </IndexTable.Row>
    //     ),
    // );
    const sourceArr = [];
    listData.forEach(ele => {
        sourceArr.push(
            [
                ele.name,
                ele.email,
                ele.phone,
                <Link
                    removeUnderline
                    target="_blank"
                    url={``}
                    key={ele.address}
                >
                    <a
                        href={`https://www.google.com/maps/place/${ele.address.split(regex).join('+')}`}
                        target="_blank" rel="noreferrer"
                        style={{textDecoration: 'none', color:"#006e52"}}
                    >{ele.address}</a>
                </Link>
            ]
        )
    })
    // console.log("Arrr", sourceArr);
    return (
        <>
            <div className="row navigation">
                <div className="col l-4 l-0-3 c-10 c-0-1">
                    <Button style={{ marginRight: 10 }} primary onClick={() => setCreate(!create)}>Create an user</Button>
                    {' '}
                    {' '}
                    <Button primary onClick={() => setShow(!show)}>Show users</Button>
                    {/* <Button primary onClick={() => setShow(!show)}>Show user</Button> */}
                </div>
            </div>
            {create &&
                <div className="row form-input">
                    <div className="col l-6 l-0-3 m-8 m-0-2 c-10 c-0-1">
                    <Heading element="h1">Create An User</Heading>
                    <br/>
                    <FormLayout onSubmit= {(e) => handleSubmit(e)}>
                        <TextField label="Full Name(*)" onChange={(e) => handleFullNameChange(e)} value={firstName} placeholder="Input your first name"/>
                        {showFirstName && <p className="warning">Input your full name, please!</p>}
                        

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

                        <div style={{display: 'flex'}}>
                            <Button onClick={(e) => handleSubmit(e)} primary>
                                Submit
                            </Button>
                            {loading && <Spinner accessibilityLabel="Submitting" size="small" />}     
                            
                        </div>
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
            {show && <div className="row form-input">
                <div className="col l-12 m-12 c-10 list-user" >
                    {/* <Heading type="h1">List Users</Heading>
                    <br/>
                
                    <Card>
                        <ResourceList
                            resourceName={{ singular: "listData",plural: "listData" }}
                            items = {listData.reverse()}
                        renderItem={(item) => {
                            const { id, address, name, phone, email } = item;
                            const media = <Avatar customer size="medium" name={name} />;

                            return (
                            <ResourceItem
                                id={id}
                                url={`https://www.google.com/maps/place/${address.split(regex).join('+')}`}
                                target="_blank"
                                media={media}
                                accessibilityLabel={`View details for ${name}`}
                            >
                                <h3>
                                        <TextStyle variation="strong">{name} </TextStyle>
                                        <p><em>{email} | {phone}</em></p>
                                </h3>
                                <div>{address}</div>
                            </ResourceItem>
                            );
                        }}
                        />
                    </Card> */}
                    <Page title="List Users">
                        <Pagination
                            
                            label={`${page}/${Math.ceil(total.length/limit)}`}
                            hasPrevious={prev}
                            onPrevious={() => {
                                // setPage(page-1)
                                handlePrev()
                            }}
                            previousTooltip="Previous"
                            nextTooltip="Next"
                            hasNext={next}
                            onNext={() => {
                                // setPage(page+1)
                                handleNext()
                            }}
                        />
                        <br/>
                        <Card>
                            <DataTable
                            columnContentTypes={[
                                'text',
                                'text',
                                'text',
                                'text',
                            ]}
                            headings={['Full Name', 'Email', 'Phone Number', 'Address',]}
                            rows={sourceArr}
                            // totals={['', '', '', 255, '$155,830.00']}
                            />
                        </Card>
                    </Page>
                    
                    
                    
                    
                </div>
            </div>}
        
        </>
    )
}
export default Form;