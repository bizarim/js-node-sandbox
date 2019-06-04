/**레디스 해쉬 키 맵핑 인터페이스 */ 
class IHashKeyMapper {
    constructor() { }
}
/** Account 관련 Keys mapper */
class AccKeys extends IHashKeyMapper {
    constructor() { super(); }
    /* Hash key main */
    getMain(accIdx)     { return ('mAcc_' + accIdx); }
    /* Hash key filed : cdType */
    getSubToCdType()    { return 'cdType'; }
    /* Hash key filed : cdToken */
    getSubToCdToken()   { return 'cdToken'; }
    /* Hash key filed : nation */
    getSubToNation()    { return 'nation'; }
    /* Hash key filed : email */
    getSubToEmail()     { return 'email'; }
    /* Hash key filed : accIdx */
    getSubToAccIdx()    { return 'accIdx'; }
    /* Hash key filed : nickName */
    getSubToNickName()  { return 'nickName'; }
    /* Hash key filed : dbIdx */
    getSubToDbIdx()     { return 'dbIdx'; }
    /* Hash key filed : sKey */
    getSubToSKey()      { return 'sKey'; }
    /* Hash key filed : rKey */
    getSubToRKey()      { return 'rKey'; }
    // /* Hash key filed : rKey */
    // getSubToReferral()      { return 'referral'; }
    /** Hash filed Object 생성 */
    createObj(_accIdx, _dbIdx, _cdType, _cdToken, _nation, _email, _nickName, _admin, _sKey) {
        if(undefined === _nation || null === _nation) _nation = "NONE";
        if(undefined === _email || null === _email) _email = "NONE";
        return {
            cdType  : _cdType,
            cdToken : _cdToken,
            nation  : _nation,
            email   : _email,
            accIdx  : _accIdx,
            nickName : _nickName,
            admin   : _admin,
            dbIdx   : _dbIdx,
            sKey    : _sKey,
            rKey    : ''
        }
    }
    convertTo(result) {
        return {
            cdType  : Number(result.cdType),
            cdToken : result.cdToken,
            nation  : result.nation,
            email   : result.email,
            accIdx  : Number(result.accIdx),
            nickName : result.nickName,
            admin   : Number(result.admin),
            dbIdx   : Number(result.dbIdx),
            sKey    : result.sKey,
            rKey    : result.rKey
        };
    }
    
}

module.exports = AccKeys;