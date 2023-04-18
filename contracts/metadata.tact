import "@stdlib/deploy";


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

    init(avatar: String, name: String, about: String, website: String, terms: String, telegram: String, github: String, 
        jetton: Address, nft: Address, hide: Bool) {
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
    }

    get fun avatar(): String {
        return self.avatar;
    }

    get fun name(): String {
        return self.name;
    }

    get fun about(): String {
        return self.about;
    }

    get fun website(): String {
        return self.website;
    }

    get fun terms(): String {
        return self.terms;
    }

    get fun telegram(): String {
        return self.telegram;
    }

    get fun github(): String {
        return self.github;
    }

    get fun jetton(): Address {
        return self.jetton;
    }

    get fun nft(): Address {
        return self.nft;
    }

    get fun hide(): Bool {
        return self.hide;
    }

}