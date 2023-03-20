import "@stdlib/deploy";


contract Metadata with Deployable {

    avatar: String;
    name: String;
    about: String;
    website: String;
    terms: String;
    twitter: String;
    github: String;
    hide: Bool;

    init(avatar: String, name: String, about: String, website: String, terms: String, twitter: String, github: String, hide: Bool) {
        self.avatar = avatar;
        self.name = name;
        self.about = about;
        self.website = website;
        self.terms = terms;
        self.twitter = twitter;
        self.github = github;
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

    get fun twitter(): String {
        return self.twitter;
    }

    get fun github(): String {
        return self.github;
    }

    get fun hide(): Bool {
        return self.hide;
    }

}