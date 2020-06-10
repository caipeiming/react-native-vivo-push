package top.cpming.rn.push.vivo;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class ReceiverViewModel extends ViewModel {
    private MutableLiveData<ReceiverData> currentData;

    public MutableLiveData<ReceiverData> getCurrentData() {
        if (currentData == null) {
            currentData = new MutableLiveData<ReceiverData>();
        }
        return currentData;
    }
}
