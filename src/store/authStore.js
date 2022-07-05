import {defineStore} from "pinia";
import {apiService} from "@/main";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        isAuth : false,
        userId : null,
        userType : null,
        userNom : null,
        userPrenom : null,
        userNoisettes : null
    }),
    getters: {
        isUserDev : (state) => {
            return state.userType === 'DEV';
        },
        isUserRap: (state) => {
            return state.userType === 'RAP';
        }
    },
    actions: {
        deconnexion(){
            this.isAuth = false;
            this.userId = null;
            this.userType = null;
            this.userNom = null;
            this.userPrenom = null;
            this.userNoisettes = null;
        },
        connexion(user){
            this.isAuth = true;
            this.userId = user.id;
            this.userType = user.type;
            this.userNom = user.nom;
            this.userPrenom = user.prenom;
            this.userNoisettes = user.noisettes;
        },
        refreshNoisette(){
            apiService.get('developpeur/noisettes/' + this.userId).then(res => {
                this.userNoisettes = res.data.noisettes;
            });
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'user',
                storage: localStorage,
            },
        ],
    }
} )