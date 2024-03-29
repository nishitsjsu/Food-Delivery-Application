import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

const getOwnerProfile = gql`
query getOwnerProfile($email: String){
    getOwnerProfile(email:$email){
        name,
        email,
        restaurantname,
        phone,
        cuisine
    }
  }
`;

const getBuyerProfile = gql`
query getBuyerProfile($email: String){
    getBuyerProfile(email:$email){
        name,
        email,
        phone
    }
  }
`;

const getOwnerSection = gql`
query getOwnerSection($ownername: String){
    getOwnerSection(ownername:$ownername){
            _id
            sectionname
    }
  }
`;

const getSectionDetails = gql`
query getSectionDetails($ownername: String, $sectionname: String){
    getSectionDetails(ownername:$ownername, sectionname:$sectionname){
            name,
            description,
            price,
            sectionname
    }
  }
`;

const buyerMenu = gql`
query buyerMenu($ownername: String){
    buyerMenu(ownername:$ownername){
            _id
            sectionname
    }
  }
`;

const buyerMenuDetails = gql`
query buyerMenuDetails($ownername: String, $sectionname: String){
    buyerMenuDetails(ownername:$ownername, sectionname:$sectionname){
            _id
            name
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, getOwnerProfile, getOwnerSection, getSectionDetails, getBuyerProfile, buyerMenu, buyerMenuDetails };