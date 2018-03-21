<a name="Credentials"></a>

## Credentials
Credentials instance

**Kind**: global class  

* [Credentials](#Credentials)
    * _instance_
        * [.password](#Credentials+password) : <code>String</code> \| <code>undefined</code>
        * [.type](#Credentials+type) : <code>String</code>
        * [.username](#Credentials+username) : <code>String</code> \| <code>undefined</code>
        * [.password](#Credentials+password) : <code>String</code> \| <code>undefined</code>
        * [.getValue(property)](#Credentials+getValue) ⇒ <code>\*</code> \| <code>undefined</code>
        * [.getValueOrFail(property)](#Credentials+getValueOrFail) ⇒ <code>\*</code>
        * [.setValue(property, value)](#Credentials+setValue) ⇒ [<code>Credentials</code>](#Credentials)
        * [.toInsecureString()](#Credentials+toInsecureString) ⇒ <code>String</code>
        * [.toSecureString(masterPassword)](#Credentials+toSecureString) ⇒ <code>Promise</code>
    * _static_
        * [.isCredentials(target)](#Credentials.isCredentials) ⇒ <code>Boolean</code>

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
<a name="Credentials+password"></a>

### credentials.password : <code>String</code> \| <code>undefined</code>
The password

**Kind**: instance property of [<code>Credentials</code>](#Credentials)  
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

<a name="Credentials.isCredentials"></a>

### Credentials.isCredentials(target) ⇒ <code>Boolean</code>
Check if an item is a Credentials instance

**Kind**: static method of [<code>Credentials</code>](#Credentials)  
**Returns**: <code>Boolean</code> - True if a credentials instance  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>Object</code> | The target to check |

