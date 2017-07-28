package com.joboffersmap;

import com.facebook.react.ReactApplication;
import com.wix.interactable.Interactable;
import com.oblador.vectoricons.VectorIconsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;

import com.reactnativenavigation.NavigationApplication;

public class MainApplication extends NavigationApplication {

 @Override
 public boolean isDebug() {
     // Make sure you are using BuildConfig from your own application
     return BuildConfig.DEBUG;
 }

 protected List<ReactPackage> getPackages() {
     return Arrays.<ReactPackage>asList(
            new VectorIconsPackage(),
            new MapsPackage(),
            new LinearGradientPackage(),
            new Interactable()
     );
 }

 @Override
 public List<ReactPackage> createAdditionalReactPackages() {
     return getPackages();
 }
}

