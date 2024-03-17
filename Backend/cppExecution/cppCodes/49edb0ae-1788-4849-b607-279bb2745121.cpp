#include <iostream> 
    using namespace std;
    // Define the main function
    int main() { 
        int arr[4];
        int sum=0;
        for(int i=0;i<4;i++){
        cin>>arr[i];
        sum+=arr[i];
        }
        cout<<sum;
        return 0;  
    }