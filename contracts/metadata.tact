import "@stdlib/deploy";
import "./messages/metadata-messages";


contract Metadata with Deployable {

    avatar: String;
    name: String;
    about: String;
    website: String;
    terms: String;
    telegram: String;
    github: String;
    jetton: Address;
    nft: Address;
    hide: Bool;
    dns: String;

    init(avatar: String, name: String, about: String, website: String, terms: String, telegram: String, github: String, 
        jetton: Address, nft: Address, hide: Bool, dns: String) {
        self.avatar = avatar;
        self.name = name;
        self.about = about;
        self.website = website;
        self.terms = terms;
        self.telegram = telegram;
        self.github = github;
        self.jetton = jetton;
        self.nft = nft;
        self.hide = hide;
        self.dns = dns;
    }

    receive() {
    }
    
    get fun state(): MetadataState {
        return MetadataState {
            avatar: self.avatar,
            name: self.name,
            about: self.about,
            website: self.website,
            terms: self.terms,
            telegram: self.telegram,
            github: self.github,
            jetton: self.jetton,
            nft: self.nft,
            hide: self.hide ,
            dns: self.dns          
        };
    }
}