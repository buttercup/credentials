<a name="Credentials"></a>

## Credentials
Credentials instance

**Kind**: global class  

* [Credentials](#Credentials)
    * [new Credentials(typeOrData)](#new_Credentials_new)
    * _instance_
        * [.password](#Credentials+password) : <code>String</code> \| <code>undefined</code>
        * [.type](#Credentials+type) : <code>String</code>
        * [.username](#Credentials+username) : <code>String</code> \| <code>undefined</code>
        * [.getID()](#Credentials+getID) ⇒ <code>String</code>
        * [.getValue(property)](#Credentials+getValue) ⇒ <code>\*</code> \| <code>undefined</code>
        * [.getValueOrFail(property)](#Credentials+getValueOrFail) ⇒ <code>\*</code>
        * [.setValue(property, value)](#Credentials+setValue) ⇒ [<code>Credentials</code>](#Credentials)
        * [.toInsecureString()](#Credentials+toInsecureString) ⇒ <code>String</code>
        * [.toSecureString(masterPassword)](#Credentials+toSecureString) ⇒ <code>Promise</code>
    * _static_
        * [.fromInsecureString(content)](#Credentials.fromInsecureString) ⇒ [<code>Credentials</code>](#Credentials)
        * [.fromPassword(password)](#Credentials.fromPassword) ⇒ [<code>Credentials</code>](#Credentials)
        * [.fromSecureString(content, password)](#Credentials.fromSecureString) ⇒ [<code>Promise.&lt;Credentials&gt;</code>](#Credentials)
        * [.isCredentials(target)](#Credentials.isCredentials) ⇒ <code>Boolean</code>
        * [.isSecureString(str)](#Credentials.isSecureString) ⇒ <code>Boolean</code>

<a name="new_Credentials_new"></a>

### new Credentials(typeOrData)
Constructor for the Credentials class


| Param | Type | Description |
| --- | --- | --- |
| typeOrData | <code>String</code> \| <code>Object</code> | The type (string), or an object representing  the Credentials data |

<a name="Credentials+password"></a>

### credentials.password : <code>String</code> \| <code>undefined</code>
The password

**Kind**: instance property of [<code>Credentials</code>](#Credentials)  
<a name="Credentials+type"></a>

### credentials.type : <code>String</code>
The credentials type

**Kind**: instance property of [<code>Credentials</code>](#Credentials)  
**Read only**: true  
<a name="Credentials+username"></a>

### credentials.username : <code>String</code> \| <code>undefined</code>
The username

**Kind**: instance property of [<code>Credentials</code>](#Credentials)  
<a name="Credentials+getID"></a>

### credentials.getID() ⇒ <code>String</code>
Get A unique ID of the datasource based on its data

**Kind**: instance method of [<code>Credentials</code>](#Credentials)  
**Returns**: <code>String</code> - A hash of the data  
<a name="Credentials+getValue"></a>

### credentials.getValue(property) ⇒ <code>\*</code> \| <code>undefined</code>
Get a value from the credentials

**Kind**: instance method of [<code>Credentials</code>](#Credentials)  
**Returns**: <code>\*</code> \| <code>undefined</code> - Returns the value if found, or undefined  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>String</code> | The property to fetch |

<a name="Credentials+getValueOrFail"></a>

### credentials.getValueOrFail(property) ⇒ <code>\*</code>
Get a value, or fail if it doesn't exist or isn't set

**Kind**: instance method of [<code>Credentials</code>](#Credentials)  
**Returns**: <code>\*</code> - The value (not undefined)  
**Throws**:

- <code>Error</code> Throws if the value is undefined


| Param | Type | Description |
| --- | --- | --- |
| property | <code>String</code> | The property to fetch |

<a name="Credentials+setValue"></a>

### credentials.setValue(property, value) ⇒ [<code>Credentials</code>](#Credentials)
Set a value for a property

**Kind**: instance method of [<code>Credentials</code>](#Credentials)  
**Returns**: [<code>Credentials</code>](#Credentials) - Returns self, for chaining  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>String</code> | The property to set |
| value | <code>\*</code> | The value to set for the property |

<a name="Credentials+toInsecureString"></a>

### credentials.toInsecureString() ⇒ <code>String</code>
Convert the credentials to an insecure string

**Kind**: instance method of [<code>Credentials</code>](#Credentials)  
**Returns**: <code>String</code> - The string-encoded credentials  
<a name="Credentials+toSecureString"></a>

### credentials.toSecureString(masterPassword) ⇒ <code>Promise</code>
Convert the credentials to an encrypted string, for storage

**Kind**: instance method of [<code>Credentials</code>](#Credentials)  
**Returns**: <code>Promise</code> - A promise that resolves with the encrypted credentials  
**Throws**:

- <code>Error</code> Rejects when masterPassword is not a string

**See**: signEncryptedContent  

| Param | Type | Description |
| --- | --- | --- |
| masterPassword | <code>string</code> | The password for encrypting |

<a name="Credentials.fromInsecureString"></a>

### Credentials.fromInsecureString(content) ⇒ [<code>Credentials</code>](#Credentials)
Create a new instance from an insecure string

**Kind**: static method of [<code>Credentials</code>](#Credentials)  
**Returns**: [<code>Credentials</code>](#Credentials) - A new instance  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The insecure string representation |

<a name="Credentials.fromPassword"></a>

### Credentials.fromPassword(password) ⇒ [<code>Credentials</code>](#Credentials)
Create a new instance from a password

**Kind**: static method of [<code>Credentials</code>](#Credentials)  
**Returns**: [<code>Credentials</code>](#Credentials) - A new instance  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>String</code> | The password |

<a name="Credentials.fromSecureString"></a>

### Credentials.fromSecureString(content, password) ⇒ [<code>Promise.&lt;Credentials&gt;</code>](#Credentials)
Create a new instance from a secure string

**Kind**: static method of [<code>Credentials</code>](#Credentials)  
**Returns**: [<code>Promise.&lt;Credentials&gt;</code>](#Credentials) - A promise that resolves with the new instance  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | Encrypted content |
| password | <code>String</code> | The password for decryption |

<a name="Credentials.isCredentials"></a>

### Credentials.isCredentials(target) ⇒ <code>Boolean</code>
Check if an item is a Credentials instance

**Kind**: static method of [<code>Credentials</code>](#Credentials)  
**Returns**: <code>Boolean</code> - True if a credentials instance  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>Object</code> | The target to check |

<a name="Credentials.isSecureString"></a>

### Credentials.isSecureString(str) ⇒ <code>Boolean</code>
Check if a string is a secure string

**Kind**: static method of [<code>Credentials</code>](#Credentials)  
**Returns**: <code>Boolean</code> - True if the string is a secure string  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | The string to check |

